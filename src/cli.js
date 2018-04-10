const commands = require('./commands');
const platforms = require('./platforms');

const Cache = require('./lib/Cache');
const Logger = require('./lib/Logger');
const Shell = require('./lib/Shell');

const { CACHE_PATH } = require('./config/paths');

const cache = new Cache(CACHE_PATH);
const log = new Logger('telly');
const shell = new Shell({ log });

async function execute(commandName) {
  await cache.load();

  const commonDependencies = {
    cache,
    log,
    shell,
    platforms,
  };

  switch (commandName) {
    case 'use':
      commands.use(commonDependencies);
      return true;
    case 'add':
      commands.add(commonDependencies);
      return true;
    default:
      break;
  }

  const targets = cache.get('targets', []);
  const targetName = cache.get('use');
  const target = targets.find(t => t.name === targetName);
  if (target === undefined) {
    log.info('No active targets. Please #use one.');
    return false;
  }

  const platform = platforms[target.platform];
  if (platform === undefined) {
    log.error('Unknown platform.', target.platform);
    return false;
  }

  const dependencies = {
    ...commonDependencies,
    platform,
    target,
  };

  switch (commandName) {
    case 'connect':
      commands.connect(dependencies, platform);
      break;
    case 'debug':
      commands.debug(dependencies, platform);
      break;
    case 'use':
      commands.use(dependencies, platform);
      break;
    default:
      break;
  }

  return true;
}

const args = process.argv.slice(2);
const commandName = args[0];

execute(commandName);
