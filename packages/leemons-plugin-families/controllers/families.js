const _ = require('lodash');

const usersService = require('../src/services/users');
const familiesService = require('../src/services/families');

const memberValidation = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
      },
      memberType: {
        type: 'string',
      },
    },
    required: ['user', 'memberType'],
    additionalProperties: false,
  },
};

async function searchUsers(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      profileType: { type: 'string', enum: ['student', 'guardian'] },
      query: {
        type: 'object',
        additionalProperties: true,
      },
    },
    required: ['profileType'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.body)) {
    const users = await usersService.searchUsers(
      ctx.request.body.profileType,
      ctx.request.body.query
    );
    ctx.status = 200;
    ctx.body = { status: 200, users };
  } else {
    throw validator.error;
  }
}

async function getDatasetForm(ctx) {
  const { compileJsonSchema, compileJsonUI } = await leemons
    .getPlugin('dataset')
    .services.dataset.getSchemaWithLocale(
      `families-data`,
      'plugins.families',
      ctx.state.userSession.locale,
      { userSession: ctx.state.userSession }
    );
  ctx.status = 200;
  ctx.body = { status: 200, jsonSchema: compileJsonSchema, jsonUI: compileJsonUI };
}

async function add(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      name: { type: 'string' },
      guardians: memberValidation,
      students: memberValidation,
      maritalStatus: { type: 'string' },
      datasetValues: {
        type: 'object',
        additionalProperties: true,
      },
    },
    required: ['name'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.body)) {
    const family = await familiesService.add(ctx.request.body, ctx.state.userSession);
    ctx.status = 200;
    ctx.body = { status: 200, family };
  } else {
    throw validator.error;
  }
}

async function update(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      guardians: memberValidation,
      students: memberValidation,
      maritalStatus: { type: 'string' },
      datasetValues: {
        type: 'object',
        additionalProperties: true,
      },
    },
    required: ['id', 'name'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.body)) {
    const family = await familiesService.update(ctx.request.body, ctx.state.userSession);
    ctx.status = 200;
    ctx.body = { status: 200, family };
  } else {
    throw validator.error;
  }
}

async function detail(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.params)) {
    const family = await familiesService.detail(ctx.request.params.id, ctx.state.userSession);
    ctx.status = 200;
    ctx.body = { status: 200, family };
  } else {
    throw validator.error;
  }
}

async function remove(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.params)) {
    const family = await familiesService.remove(ctx.request.params.id);
    ctx.status = 200;
    ctx.body = { status: 200, family };
  } else {
    throw validator.error;
  }
}

async function list(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      page: { type: 'number' },
      size: { type: 'number' },
      query: { type: 'object', additionalProperties: true },
    },
    required: ['page', 'size'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.body)) {
    const { page, size, ...options } = ctx.request.body;
    const data = await familiesService.list(page, size, { ...options });
    ctx.status = 200;
    ctx.body = { status: 200, data };
  } else {
    throw validator.error;
  }
}

module.exports = {
  searchUsers,
  getDatasetForm,
  add,
  detail,
  list,
  update,
  remove,
};