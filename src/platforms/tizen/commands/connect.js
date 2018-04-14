const outputs = require('../outputs');

const tizenCommandConnect = async ({ log, shell, target }) => {
  const command = {
    sdk: target.sdk,
    bin: 'tools/sdb',
    args: [
      'connect', target.host,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);
    if (stdout.includes(outputs.ALREADY_CONNECTED)) {
      log.info('Already connected.');
      return;
    }
    if (stdout.includes(outputs.CONNECTED)) {
      log.info('Connected.');
      return;
    }
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = tizenCommandConnect;
