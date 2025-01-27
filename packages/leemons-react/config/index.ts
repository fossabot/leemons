import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import { flatten } from 'lodash';
import {
  createFile,
  createFolderIfMissing,
  fileExists,
  listFiles,
  createSymLink,
  copyFile,
  removeFiles,
  fileList,
  copyFileWithSquirrelly,
  copyFolder,
  folderExists,
  createJsConfig,
  createEsLint,
} from './lib/fs';
import compile from './lib/webpack';
import createReloader from './lib/watch';
import { hash } from './lib/crypto';
import { config } from 'webpack';

/* Dirs */
const frontDir = path.resolve(__dirname, '..', 'front');
const configDir = {
  lib: path.resolve(__dirname, 'lib'),
  src: path.resolve(__dirname, 'src'),
};

const pluginsFile = path.resolve(process.argv[2], 'enabledPlugins.json');

/* Helpers */
interface Plugin {
  name: string;
  path: string;
  routers?: {
    public?: boolean;
    private?: boolean;
  };
  public?: boolean;
  hooks?: boolean;
  globalContext?: boolean;
  localContext?: boolean;
}

/* Global aliases */
const globalAliases = { '@leemons': frontDir };

// Get all the plugin which need to be installed on front
async function getPlugins(): Promise<Plugin[]> {
  const plugins = (await fs.readJSON(pluginsFile)) as { name: string; path: string }[];
  return plugins.map((plugin: { name: string; path: string }) => ({
    name: plugin.name,
    path: path.resolve(pluginsFile, '..', plugin.path),
  }));
}

// Create the package.json file if missing
async function createMissingPackageJSON(dir: string, config: Object): Promise<boolean> {
  if (!(await fileExists(dir))) {
    await copyFileWithSquirrelly(path.resolve(configDir.src, 'package.json'), dir, config);
    return true;
  }
  return false;
}

// Intall front monorepo dependencies
function installDeps(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const { stdout, stderr } = execa.command(`yarn --cwd ${dir}`);

    if (stderr) {
      stderr.on('data', (e) => {
        const message = e.toString();
        if (message.startsWith('warning')) {
        } else {
          reject(new Error(message));
        }
      });
    }

    if (stdout) {
      stdout.pipe(process.stdout);

      stdout.on('end', () => {
        resolve();
      });
    }
  });
}

// Save the current src files as symlinks in frontdir
async function linkSourceCode(dir: string, plugins: Plugin[]): Promise<Map<string, fileList>> {
  await createFolderIfMissing(dir);

  // Check which files still exists
  const existingFiles = await listFiles(dir, true);

  // Create the missing symlinks
  await Promise.all(
    plugins.map(({ name, path: pluginDir }) => {
      if (!existingFiles.get(name)) {
        return createSymLink(pluginDir, path.resolve(dir, name));
      }
      existingFiles.delete(name);

      return null;
    })
  );

  // Return extra files
  return existingFiles;
}

// Check public/private routes
async function checkPluginPaths(plugin: Plugin[]): Promise<Plugin[]>;
async function checkPluginPaths(plugin: Plugin): Promise<Plugin>;
async function checkPluginPaths(plugin: Plugin | Plugin[]): Promise<Plugin | Plugin[]> {
  if (Array.isArray(plugin)) {
    return Promise.all(plugin.map(checkPluginPaths));
  }
  return {
    ...plugin,
    routers: {
      public: await fileExists(path.resolve(plugin.path, 'Public.js')),
      private: await fileExists(path.resolve(plugin.path, 'Private.js')),
    },
    public: await folderExists(path.resolve(plugin.path, 'public')),
    hooks: await fileExists(path.resolve(plugin.path, 'globalHooks.js')),
    globalContext: await fileExists(path.resolve(plugin.path, 'globalContext.js')),
    localContext: await fileExists(path.resolve(plugin.path, 'localContext.js')),
  };
}

// Generate current status description file
async function generateLockFile(plugins: Plugin[]): Promise<{
  plugins: Plugin[];
  hash: string | null;
}> {
  const lockFile: { plugins: Plugin[]; hash: string | null } = {
    plugins,
    hash: null,
  };

  lockFile.hash = hash(lockFile);
  return lockFile;
}

// Get saved lock file
async function getSavedLockFile(lockDir: string): Promise<{
  plugins?: Plugin[];
  hash: string | null;
}> {
  let oldLock = { hash: null };
  try {
    oldLock = await fs.readJSON(lockDir);
  } catch (e) {
    // Do not throw
  }

  return oldLock;
}

// Save Leemons Lock File if modified
async function saveLockFile(dir: string, plugins: Plugin[]): Promise<boolean> {
  const lockDir = path.resolve(dir, 'leemons.lock.json');
  const lockFile = await generateLockFile(plugins);
  const oldLock = await getSavedLockFile(lockDir);

  if (lockFile.hash !== oldLock.hash) {
    await fs.writeJSON(lockDir, lockFile);
    return true;
  }

  return false;
}

// Generate the monorepo related files
async function generateMonorepo(dir: string, plugins: Plugin[]): Promise<void> {
  await createFolderIfMissing(dir);
  await createMissingPackageJSON(path.resolve(dir, 'package.json'), {
    name: 'leemons-front',
    version: '1.0.0',
  });

  // Generate App index.js
  await copyFile(path.resolve(configDir.src, 'index.js'), path.resolve(frontDir, 'index.js'));

  // Generate reset global.css
  await copyFile(path.resolve(configDir.src, 'global.css'), path.resolve(frontDir, 'global.css'));

  // Generate App contexts folder
  await copyFolder(path.resolve(configDir.src, 'contexts'), path.resolve(frontDir, 'contexts'));

  const modified = await saveLockFile(frontDir, plugins);

  if (modified) {
    // Copy App.js
    await copyFileWithSquirrelly(
      path.resolve(configDir.src, 'App.squirrelly'),
      path.resolve(frontDir, 'App.js'),
      { plugins }
    );
  }

  const extraFiles = await linkSourceCode(path.resolve(dir, 'plugins'), plugins);

  await removeFiles(path.resolve(dir, 'plugins'), extraFiles);
  await installDeps(dir);

  // Re-generate "jsconfig.json" file
  await createJsConfig(plugins);

  // Re-generate ".eslintrc.json" file
  await createEsLint(plugins);
}

// Generate alias object for webpack
function generateAliases(dir: string, plugins: Plugin[]): {} {
  return plugins.reduce(
    (obj, plugin) => ({
      ...obj,
      [`@${plugin.name}`]: path.resolve(dir, 'plugins', plugin.name, 'src'),
    }),
    { ...globalAliases }
  );
}

// Generate public folders list for webpack config
function generatePublicFolders(dir: string, plugins: Plugin[]): {} {
  return plugins
    .filter(({ public: hasPublic }) => hasPublic)
    .map(({ name }) => ({
      from: path.resolve(dir, 'plugins', name, 'public'),
      to: path.join('public', name),
      noErrorOnMissing: true,
    }));
}

// Main function of the service
async function main(): Promise<void> {
  let plugins = await checkPluginPaths(await getPlugins());

  await generateMonorepo(frontDir, plugins);

  // Start compilation process
  let stop = await compile(
    {
      alias: generateAliases(frontDir, plugins),
      filesToCopy: generatePublicFolders(frontDir, plugins),
      useLegacy: process.argv[3] === '--legacy'
    },
    // Trigger function when code changes are detected
    async () => {
      const modified = await saveLockFile(frontDir, plugins);

      if (modified) {
        // Copy App.js
        await copyFileWithSquirrelly(
          path.resolve(configDir.src, 'App.squirrelly'),
          path.resolve(frontDir, 'App.js'),
          { plugins }
        );
      }
    },
    plugins
  );

  // When a public/private file is added, recreate App.js
  createReloader({
    name: 'pluginsAppPaths',
    dirs: flatten(
      plugins.map((plugin: Plugin) => [
        path.resolve(plugin.path, 'Public.js'),
        path.resolve(plugin.path, 'Private.js'),
        path.resolve(plugin.path, 'globalHooks.js'),
        path.resolve(plugin.path, 'globalContext.js'),
        path.resolve(plugin.path, 'localContext.js'),
      ])
    ),
    config: {
      ignoreInitial: true,
      followSymlinks: true,
      // Wait to the system write call
      // awaitWriteFinish: true,
    },
    handler: async (event, filename) => {
      // Only trigger add events
      if (event === 'add') {
        // setTimeout(async () => {
        // Regenerate LockFile
        const modified = await saveLockFile(frontDir, plugins);

        // Regenerate AppJS
        if (modified) {
          // Copy App.js
          await copyFileWithSquirrelly(
            path.resolve(configDir.src, 'App.squirrelly'),
            path.resolve(frontDir, 'App.js'),
            { plugins: await checkPluginPaths(plugins) }
          );
        }
        // }, 1500);
      }
    },
  });

  // TODO: Remove watcher, move to api call
  // Watch to the plugins file, and rebuild when updated
  createReloader({
    name: 'Leemons Front',
    dirs: pluginsFile,
    logger: console,
    handler: async () => {
      await stop();
      plugins = await checkPluginPaths(await getPlugins());
      await generateMonorepo(frontDir, plugins);
      stop = await compile(
        {
          alias: generateAliases(frontDir, plugins),
          filesToCopy: generatePublicFolders(frontDir, plugins),
          useLegacy: process.argv[3] === '--legacy'
        },
        async () => {
          const modified = await saveLockFile(frontDir, await checkPluginPaths(plugins));

          if (modified) {
            // Copy App.js
            await copyFileWithSquirrelly(
              path.resolve(configDir.src, 'App.squirrelly'),
              path.resolve(frontDir, 'App.js'),
              { plugins: await checkPluginPaths(plugins) }
            );
          }
        },
        plugins
      );
    },
  });
}

main();
