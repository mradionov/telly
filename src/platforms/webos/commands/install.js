const pathHelper = require('path');

const fs = require('../../../lib/fs');

const outputs = require('../outputs');

const webosCommandInstall = async ({ log, shell, target }, packDirPath) => {
  const appInfoPath = pathHelper.join(target.source, 'appinfo.json');
  const appInfo = await fs.readJSON(appInfoPath, null);
  if (appInfo === null) {
    log.error('Could not find appinfo.json in source directory.');
    return;
  }

  const { id, version } = appInfo;

  const packName = `${id}_${version}_all.ipk`;
  const packPath = pathHelper.join(packDirPath, packName);

  const command = {
    sdk: target.sdk,
    bin: 'ares-install',
    args: [
      '--device', target.name,
      packPath,
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

module.exports = webosCommandInstall;
