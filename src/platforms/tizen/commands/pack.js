const outputs = require('../outputs');

const tizenCommandPack = async ({ log, shell, target }, packDirPath) => {
  log.info('Packing...');

  const command = {
    sdk: target.sdk,
    bin: 'tools/ide/bin/tizen',
    args: [
      'package',
      '--type', 'wgt',
      '--sign', 'telly-security-profile',
      '--output', packDirPath,
      '--', target.source,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);
    if (stdout.includes(outputs.PACK_SUCCESS)) {
      log.info('Packed.');
      return;
    }
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = tizenCommandPack;
