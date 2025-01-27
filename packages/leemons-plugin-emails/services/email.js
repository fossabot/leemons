const email = require('../src/services/email');

module.exports = {
  add: email.add,
  send: email.send,
  types: email.types,
  delete: email.delete,
  deleteAll: email.deleteAll,
  addProvider: email.addProvider,
  addIfNotExist: email.addIfNotExist,
  sendAsPlatform: email.sendAsPlatform,
  sendAsEducationalCenter: email.sendAsEducationalCenter,
};
