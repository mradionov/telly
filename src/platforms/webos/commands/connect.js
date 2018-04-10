const { trimEndSlashes } = require('../../../utils/string');

const errorTypes = require('../errors');

const webosCommandConnect = async ({ log, shell, target }) => {
  let command = `${trimEndSlashes(target.sdk)}/`;
  command += 'ares-novacom --getkey';
  command += ` -d ${target.reference}`;

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('out', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(errorTypes.NO_DEVICE_MATCHING)) {
      log.error('Device not found by reference.', target.reference);
      return;
    }
    if (message.includes(errorTypes.NO_SSH_KEY)) {
      log.error('Connection failed. Turn on "Key server" in "Developer Mode".');
      return;
    }

    throw err;
  }
};

module.exports = webosCommandConnect;