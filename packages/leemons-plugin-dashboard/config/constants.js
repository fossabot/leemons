const pluginName = 'plugins.scores';

const permissions = [];

const menuItems = [
  {
    config: {
      key: 'dashboard',
      iconSvg: '/public/assets/svgs/plugin-dashboard.svg',
      activeIconSvg: '/public/assets/svgs/plugin-dashboard.svg',
      url: '/private/dashboard',
      label: {
        en: 'Dashboard',
        es: 'Dashboard',
      },
    },
  },
];

const widgets = {
  zones: [
    { key: 'plugins.dashboard.program.left' },
    { key: 'plugins.dashboard.program.right' },
    { key: 'plugins.dashboard.class.tabs' },
    { key: 'plugins.dashboard.class.right-tabs' },
    { key: 'plugins.dashboard.class.control-panel' },
  ],
  items: [
    {
      zoneKey: 'plugins.dashboard.class.tabs',
      key: `plugins.dashboard.class.tab.control-panel`,
      url: 'tab-control-panel/index',
      properties: {
        label: 'plugins.dashboard.tabControlPanel.label',
      },
    },
  ],
};

module.exports = {
  pluginName,
  permissions,
  menuItems,
  widgets,
};