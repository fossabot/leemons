const { table } = require('../tables');
const { getPermissionConfig } = require('./getPermissionConfig');

/**
 * Add calendar with the provided key if not already exists
 * @public
 * @static
 * @param {string} id - id
 * @param {any=} transacting - DB Transaction
 * @return {Promise<any>}
 * */
async function removeOrCancel(id, { forceDelete, transacting: _transacting } = {}) {
  return global.utils.withTransaction(
    async (transacting) => {
      const permissionConfig = getPermissionConfig(id);
      const permissionQuery = {
        permissionName: permissionConfig.permissionName,
      };
      const userPlugin = leemons.getPlugin('users');
      // ES: Buscamos que agentes tienen permiso al evento
      const userAgentIds = await userPlugin.services.permissions.findUserAgentsWithPermission(
        permissionQuery,
        {
          transacting,
        }
      );
      // ES: Si hay mas de un invitado (Owner + otros) cancelamos el evento
      if (userAgentIds.length > 1 && !forceDelete) {
        return table.events.update({ id }, { status: 'cancel' }, { transacting });
      }
      // ES: Si solo hay un invitado (Owner) borramos el evento
      if (userAgentIds.length) {
        await userPlugin.services.users.removeCustomUserAgentPermission(
          userAgentIds[0],
          permissionQuery,
          {
            transacting,
          }
        );
      }
      return table.events.delete({ id }, { transacting });
    },
    table.events,
    _transacting
  );
}

module.exports = { removeOrCancel };
