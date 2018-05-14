const pathHelper = require('path');

const fs = require('../../../lib/fs');

const outputs = require('../outputs');

const webosCommandLaunch = async ({
  log, shell, target,
  CommandError,
}) => {
  log.info('Launching...');

  const appInfoPath = pathHelper.join(target.source, 'appinfo.json');
  const appInfo = await fs.readJSON(appInfoPath, null);
  if (appInfo === null) {
    throw new CommandError('Could not find appinfo.json in source directory.');
  }

  const { id } = appInfo;

  const command = {
    sdk: target.sdk,
    bin: 'CLI/bin/ares-launch',
    args: [
      '--device', target.name,
      id,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);

    if (stdout.includes(outputs.LAUNCH_SUCCESS)) {
      log.info('Launched.');
      return;
    }

    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(outputs.CONNECTION_TIMEOUT)) {
      throw new CommandError('Connection timeout.');
    }

    throw err;
  }
};

module.exports = webosCommandLaunch;
