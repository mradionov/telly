const outputs = require('../outputs');

const webosCommandConnect = async ({
  log, raise, shell, target,
}) => {
  const command = {
    sdk: target.sdk,
    bin: 'ares-novacom',
    args: [
      '--getkey',
      '--device', target.name,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(outputs.NO_DEVICE_MATCHING)) {
      raise('Device not found by name.', target.name);
    }

    if (message.includes(outputs.NO_SSH_KEY)) {
      raise('Connection failed. Turn on "Key server" in "Developer Mode".');
    }

    throw err;
  }
};

module.exports = webosCommandConnect;
