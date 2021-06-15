module.exports = {
  modelName: 'role-permission',
  collectionName: 'role-permission',
  options: {
    useTimestamps: true,
  },
  attributes: {
    role: {
      references: {
        collection: 'plugins_users-groups-roles::roles',
      },
    },
    permissionName: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    actionName: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    target: {
      type: 'string',
    },
  },
  primaryKey: {
    type: 'string',
  },
};
