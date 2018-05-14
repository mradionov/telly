const add = require('./add');
const connect = require('./connect');
const edit = require('./edit');
const inspect = require('./inspect');
const install = require('./install');
const launch = require('./launch');
const pack = require('./pack');

const commands = {
  add,
  connect,
  edit,
  inspect,
  install,
  launch,
  pack,
};

module.exports = commands;
