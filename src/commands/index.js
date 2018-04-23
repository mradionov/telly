const add = require('./add');
const connect = require('./connect');
const inspect = require('./inspect');
const install = require('./install');
const launch = require('./launch');
const pack = require('./pack');
const use = require('./use');

const commands = {
  add,
  connect,
  inspect,
  install,
  launch,
  pack,
  use,
};

module.exports = commands;
