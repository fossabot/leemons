/* eslint-disable no-param-reassign */
const _ = require('lodash');
const { table } = require('../tables');
const { validateSaveConfig } = require('../../validations/forms');
const { getConfig } = require('./getConfig');

async function saveConfig(data, { transacting: _transacting } = {}) {
  return global.utils.withTransaction(
    async (transacting) => {
      delete data.deleted_at;
      delete data.updated_at;
      delete data.created_at;
      delete data.deleted;
      delete data.id;
      validateSaveConfig(data);
      await table.config.set(
        { program: data.program },
        {
          ...data,
          courseDates: JSON.stringify(data.courseDates),
          courseDays: JSON.stringify(data.courseDays),
          courseHours: JSON.stringify(data.courseHours),
          breaks: JSON.stringify(data.breaks),
        },
        { transacting }
      );
      return getConfig(data.program, { transacting });
    },
    table.config,
    _transacting
  );
}

module.exports = { saveConfig };
