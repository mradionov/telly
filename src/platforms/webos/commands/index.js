const add = require('./add');
const connect = require('./connect');
const debug = require('./debug');
const install = require('./install');
const pack = require('./pack');

const commands = {
  add,
  connect,
  debug,
  install,
  pack,
};

module.exports = commands;
