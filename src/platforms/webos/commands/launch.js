const pathHelper = require('path');

const fs = require('../../../lib/fs');

const outputs = require('../outputs');

const webosCommandLaunch = async ({ log, shell, target }) => {
  const appInfoPath = pathHelper.join(target.source, 'appinfo.json');
  const appInfo = await fs.readJSON(appInfoPath, null);
  if (appInfo === null) {
    log.error('Could not find appinfo.json in source directory.');
    return;
  }

  const { id } = appInfo;

  const command = {
    sdk: target.sdk,
    bin: 'ares-launch',
    args: [
      '--device', target.name,
      id,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(outputs.CONNECTION_TIMEOUT)) {
      log.error('Connection timeout.');
      return;
    }

    throw err;
  }
};

module.exports = webosCommandLaunch;
