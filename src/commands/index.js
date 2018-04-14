const add = require('./add');
const connect = require('./connect');
const debug = require('./debug');
const install = require('./install');
const pack = require('./pack');
const use = require('./use');

const commands = {
  add,
  connect,
  debug,
  install,
  pack,
  use,
};

module.exports = commands;
