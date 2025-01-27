module.exports = {
  modelName: 'config',
  collectionName: 'config',
  options: {
    useTimestamps: true,
  },
  attributes: {
    name: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    secure: {
      type: 'boolean',
    },
    port: {
      type: 'number',
      options: {
        notNull: true,
      },
    },
    host: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    user: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    pass: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
  },
  primaryKey: {
    type: 'uuid',
  },
};
