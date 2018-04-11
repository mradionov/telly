const { trimEndSlashes } = require('../../../utils/string');

const outputs = require('../outputs');

const webosCommandConnect = async ({ log, shell, target }) => {
  let command = `${trimEndSlashes(target.sdk)}/`;
  command += 'ares-novacom --getkey';
  command += ` --device ${target.name}`;

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('out', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(outputs.NO_DEVICE_MATCHING)) {
      log.error('Device not found by name.', target.name);
      return;
    }
    if (message.includes(outputs.NO_SSH_KEY)) {
      log.error('Connection failed. Turn on "Key server" in "Developer Mode".');
      return;
    }

    throw err;
  }
};

module.exports = webosCommandConnect;
