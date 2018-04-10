const add = require('./add');
const connect = require('./connect');
const debug = require('./debug');
const use = require('./use');

const commands = {
  add,
  connect,
  debug,
  use,
};

module.exports = commands;
