module.exports = {
  modelName: 'assignables',
  attributes: {
    asset: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    role: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    gradable: {
      type: 'boolean',
      options: {
        notNull: true,
      },
    },
    center: {
      type: 'uuid',
    },
    statement: {
      type: 'richtext',
    },
    development: {
      type: 'richtext',
    },
    duration: {
      type: 'string',
    },
    resources: {
      type: 'json',
    },
    submission: {
      type: 'json',
    },
    instructionsForTeachers: {
      type: 'richtext',
    },
    relatedAssignables: {
      type: 'json',
      options: {
        defaultTo: null,
      },
    },
    instructionsForStudents: {
      type: 'richtext',
    },
    metadata: {
      type: 'json',
    },
  },
  primaryKey: {
    name: 'id',
    type: 'string',
    specificType: 'varchar(255)',
  },
};
