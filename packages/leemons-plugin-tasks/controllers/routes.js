const {
  permissions: { names: permissions },
} = require('../config/constants');

const getPermissions = (permissionsArr, actions = null) => {
  if (Array.isArray(permissionsArr)) {
    return permissionsArr.reduce(
      (obj, [permission, _actions]) => ({
        ...obj,
        [permission]: {
          actions: _actions.includes('admin') ? _actions : ['admin', ..._actions],
        },
      }),
      {}
    );
  }
  return {
    [permissionsArr]: {
      actions: actions.includes('admin') ? actions : ['admin', ...actions],
    },
  };
};

module.exports = [
  /**
   * Tasks
   */
  {
    method: 'POST',
    path: '/tasks',
    handler: 'tasks.create',
    authenticated: true,
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: 'tasks.update',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/search',
    handler: 'tasks.search',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/:id',
    handler: 'tasks.get',
    authenticated: true,
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: 'tasks.remove',
    authenticated: true,
  },
  {
    method: 'POST',
    path: '/tasks/:id/publish',
    handler: 'tasks.publish',
    authenticated: true,
  },

  /**
   * Tags
   */
  {
    method: 'POST',
    path: '/tasks/:task/tags',
    handler: 'tags.add',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/:task/tags',
    handler: 'tags.get',
    authenticated: true,
  },
  {
    method: 'DELETE',
    path: '/tasks/:task/tags',
    handler: 'tags.remove',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/:task/tags/has',
    handler: 'tags.has',
    authenticated: true,
  },

  /**
   * Attachments
   */
  {
    method: 'POST',
    path: '/tasks/:task/attachments',
    handler: 'attachments.add',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/:task/attachments',
    handler: 'attachments.get',
    authenticated: true,
  },
  {
    method: 'DELETE',
    path: '/tasks/:task/attachments',
    handler: 'attachments.remove',
    authenticated: true,
  },

  /**
   *  Assignments
   */

  // Instance
  {
    method: 'POST',
    path: '/tasks/:task/assignments/instance',
    handler: 'assignments.instanceCreate',
    authenticated: true,
  },
  {
    method: 'DELETE',
    path: '/tasks/:task/assignments/instance/:instance',
    handler: 'assignments.instanceDelete',
    authenticated: true,
  },
  // Student
  {
    method: 'POST',
    path: '/tasks/instances/:instance/student',
    handler: 'assignments.studentAssign',
    authenticated: true,
  },
  {
    method: 'DELETE',
    path: '/tasks/instances/:instance/student/:student',
    handler: 'assignments.studentUnassign',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/instances/:instance/students',
    handler: 'assignments.studentList',
    authenticated: true,
  },
  // Teacher
  {
    method: 'POST',
    path: '/tasks/instances/:instance/teacher',
    handler: 'assignments.teacherAssign',
    authenticated: true,
  },
  {
    method: 'DELETE',
    path: '/tasks/instances/:instance/teacher/:teacher',
    handler: 'assignments.teacherUnassign',
    authenticated: true,
  },
  {
    method: 'GET',
    path: '/tasks/instances/:instance/teachers',
    handler: 'assignments.teacherList',
    authenticated: true,
  },

  /**
   * Settings
   */
  {
    path: '/settings',
    method: 'GET',
    handler: 'settings.findOne',
    authenticated: true,
    allowedPermissions: getPermissions(permissions.tasks, ['view']),
  },
  {
    path: '/settings',
    method: 'POST',
    handler: 'settings.update',
    authenticated: true,
    allowedPermissions: getPermissions(permissions.tasks, ['update']),
  },
  {
    path: '/settings/enable-menu-item',
    method: 'POST',
    handler: 'settings.enableMenuItem',
    authenticated: true,
    allowedPermissions: getPermissions(permissions.tasks, ['update']),
  },
];