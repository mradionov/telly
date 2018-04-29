const commands = require('./commands');
const platforms = require('./platforms');

const Cache = require('./lib/Cache');
const CommandError = require('./lib/CommandError');
const Deferred = require('./lib/Deferred');
const Logger = require('./lib/Logger');
const Shell = require('./lib/Shell');

const { CACHE_PATH } = require('./config/paths');

const cache = new Cache(CACHE_PATH);
const log = new Logger('telly');
const shell = new Shell({ log });

async function execute(commandName) {
  await cache.load();

  const targets = cache.get('targets', []);

  const commonDependencies = {
    cache,
    commands,
    log,
    platforms,
    shell,
    targets,
    CommandError,
    Deferred,
  };

  switch (commandName) {
    case 'add':
      return commands.add(commonDependencies);
    case 'list':
      return commands.list(commonDependencies);
    case 'use':
      return commands.use(commonDependencies);
    default:
      break;
  }

  const targetName = cache.get('use');
  const target = targets.find(t => t.name === targetName);
  if (target === undefined) {
    log.info('No active targets. Please #use one.');
    return Promise.reject();
  }

  const platform = platforms[target.platform];
  if (platform === undefined) {
    log.error('Unknown platform.', target.platform);
    return Promise.reject();
  }

  const dependencies = {
    ...commonDependencies,
    platform,
    target,
  };

  switch (commandName) {
    case 'connect':
      return commands.connect(dependencies);
    case 'debug':
      return commands.debug(dependencies);
    case 'inspect':
      return commands.inspect(dependencies);
    case 'install':
      return commands.install(dependencies);
    case 'launch':
      return commands.launch(dependencies);
    case 'pack':
      return commands.pack(dependencies);
    case 'run':
      return commands.run(dependencies);
    case 'use':
      return commands.use(dependencies);
    default:
      break;
  }

  return Promise.reject();
}

const args = process.argv.slice(2);
const commandName = args[0];

execute(commandName)
  .catch((err) => {
    if (err instanceof CommandError) {
      log.error(...err.args);
    } else {
      log.error(err);
    }
  });
