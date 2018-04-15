const add = require('./add');
const connect = require('./connect');
const debug = require('./debug');
const install = require('./install');
const launch = require('./launch');
const pack = require('./pack');

const commands = {
  add,
  connect,
  debug,
  install,
  launch,
  pack,
};

module.exports = commands;
