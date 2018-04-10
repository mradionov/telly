const { trimEndSlashes } = require('../../../utils/string');

const errorTypes = require('../errors');

const webosCommandDebug = async ({ log, shell, target }) => {
  let command = `${trimEndSlashes(target.sdk)}/`;
  command += 'ares-inspect';
  command += ` -d ${target.reference}`;
  command += ` -a ${target.id}`;
  command += ' -o';

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('out', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(errorTypes.NO_DEVICE_MATCHING)) {
      log.error('Device not found by reference.', target.reference);
      return;
    }

    throw err;
  }
};

module.exports = webosCommandDebug;

