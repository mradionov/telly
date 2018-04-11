const { trimEndSlashes } = require('../../../utils/string');

const outputs = require('../outputs');

const tizenCommandConnect = async ({ log, shell, target }) => {
  let command = `${trimEndSlashes(target.sdk)}/`;
  command += 'tools/sdb';
  command += ` connect ${target.host}`;

  try {
    const { stdout, stderr } = await shell.execute(command);
    if (stdout.includes(outputs.ALREADY_CONNECTED)) {
      log.info('Already connected.');
      return;
    }
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = tizenCommandConnect;
