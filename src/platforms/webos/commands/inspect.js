const pathHelper = require('path');

const fs = require('../../../lib/fs');

const outputs = require('../outputs');

const webosCommandInspect = async ({ log, shell, target }) => {
  const appInfoPath = pathHelper.join(target.source, 'appinfo.json');
  const appInfo = await fs.readJSON(appInfoPath, null);
  if (appInfo === null) {
    log.error('Could not find appinfo.json in source directory.');
    return;
  }

  const { id } = appInfo;

  const command = {
    sdk: target.sdk,
    bin: 'ares-inspect',
    args: [
      '--device', target.name,
      '--app', id,
      '--open',
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
    if (message.includes(outputs.NO_DEVICE_MATCHING)) {
      log.error('Device not found by reference.', target.reference);
      return;
    }

    throw err;
  }
};

module.exports = webosCommandInspect;

