const add = require('./add');
const connect = require('./connect');
const debug = require('./debug');
const inspect = require('./inspect');
const install = require('./install');
const launch = require('./launch');
const list = require('./list');
const pack = require('./pack');
const run = require('./run');
const use = require('./use');

const commands = {
  add,
  connect,
  debug,
  inspect,
  install,
  launch,
  list,
  pack,
  run,
  use,
};

module.exports = commands;
