const commands = require('./commands');
const Store = require('./lib/Store');
const { CACHE_PATH } = require('./config/paths');

const cache = new Store(CACHE_PATH);

async function execute(commandName) {
  await cache.load();

  const targets = cache.get('targets', []);
  const targetName = cache.get('use');
  const target = targets.find(t => t.name === targetName);

  const dependencies = {
    cache,
    target,
  };

  const targetlessCommands = ['use', 'add'];

  if (!targetlessCommands.includes(commandName) && target === undefined) {
    const isSuccessful = await commands.use(dependencies);
    if (isSuccessful) {
      execute(commandName);
      return true;
    }
    return false;
  }

  switch (commandName) {
    case 'add':
      commands.add(dependencies);
      break;
    case 'debug':
      commands.debug(dependencies);
      break;
    case 'use':
      commands.use(dependencies);
      break;
    default:
      break;
  }

  return true;
}

const args = process.argv.slice(2);
const commandName = args[0];

execute(commandName);
