const commands = require('./commands');
const Store = require('./lib/Store');
const { CACHE_PATH } = require('./config/paths');

const cache = new Store(CACHE_PATH);

const args = process.argv.slice(2);
const commandName = args[0];

async function main() {
  switch (commandName) {
    case 'add':
      commands.add(cache);
      break;
    default:
      break;
  }
}

main();
