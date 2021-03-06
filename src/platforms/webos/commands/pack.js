const outputs = require('../outputs');

const webosCommandPack = async ({ log, shell, target }, packDirPath) => {
  log.info('Packing...');

  const command = {
    sdk: target.sdk,
    bin: 'CLI/bin/ares-package',
    args: [
      '--outdir', packDirPath,
      target.source,
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

module.exports = webosCommandPack;
