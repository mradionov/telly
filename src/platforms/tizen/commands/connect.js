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
    if (stdout.includes(outputs.CONNECT_FAILED)) {
      // TODO: log as list
      log.error('Connection failed. Is TV turned on? Is IP correct? Have you added host ip to tv dev tools?');
      return;
    }
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = tizenCommandConnect;
