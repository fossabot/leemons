const path = require('path');
const createFile = require('./helpers/utils/createFile');

module.exports = async (appName, routes) => {
  // Generate the app package.json
  const packageJSON = {
    name: appName,
    version: '1.0.0',
    private: true,
    scripts: {
      start: 'leemons start',
      dev: 'leemons dev',
      leemons: 'leemons',
    },
    leemons: {},
  };

  if (routes.config !== 'config') {
    packageJSON.leemons.configDir = routes.config;
  }
  const packageJSONDir = path.join(routes.app, 'package.json');
  await createFile(packageJSONDir, `${JSON.stringify(packageJSON, '', 2)}\n`);
};
