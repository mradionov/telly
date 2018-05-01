const pathHelper = require('path');

const outputs = require('../outputs');

const tizenCommandInstall = async ({
  fs, log, shell, target,
  CommandError,
}, packDirPath) => {
  log.info('Installing...');

  const configPath = pathHelper.join(target.source, 'config.xml');
  const config = await fs.readXML(configPath);
  if (config === null) {
    throw new CommandError('Could not load config.xml from source directory.');
  }

  const { widget } = config;
  const name = widget.name[0];

  const packName = `${name}.wgt`;

  const command = {
    sdk: target.sdk,
    bin: 'tools/ide/bin/tizen',
    args: [
      'install',
      '--name', packName,
      '--', packDirPath,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    const { stdout } = err;

    if (stdout.includes(outputs.INSTALL_NO_CONNECTION)) {
      throw new CommandError('No connected device.');
    }

    throw err;
  }
};

module.exports = tizenCommandInstall;
