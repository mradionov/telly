const pathHelper = require('path');

const fs = require('../../../lib/fs');

const outputs = require('../outputs');

const webosCommandInstall = async ({
  log, shell, target,
  CommandError,
}, packDirPath) => {
  log.info('Installing...');

  const configPath = pathHelper.join(target.source, 'appinfo.json');
  const config = await fs.readJSON(configPath);
  if (config === null) {
    throw new CommandError('Could not load appinfo.json from source directory.');
  }

  const { id, version } = config;

  const packName = `${id}_${version}_all.ipk`;
  const packPath = pathHelper.join(packDirPath, packName);

  const command = {
    sdk: target.sdk,
    bin: 'CLI/bin/ares-install',
    args: [
      '--device', target.name,
      packPath,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);

    if (stdout.includes(outputs.INSTALL_SUCCESS)) {
      log.info('Installed.');
      return;
    }

    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(outputs.CONNECTION_TIMEOUT)) {
      throw new CommandError('Connection timeout.');
    }

    if (message.includes(outputs.INSTALL_PASSPHRASE_INVALID)) {
      throw new CommandError('Invalid passphrase.');
    }

    throw err;
  }
};

module.exports = webosCommandInstall;
