const outputs = require('../outputs');

const webosCommandAdd = async ({ log, shell, CommandError }, target) => {
  const command = {
    sdk: target.sdk,
    bin: 'ares-setup-device',
    args: [
      '--add', target.name,
      '--info', `"name=${target.name}"`,
      '--info', `"host=${target.host}"`,
      '--info', '"port=9922"',
      '--info', '"username=prisoner"',
      '--info', '"password="',
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);

    if (stdout.includes(outputs.ADD_SUCCESS)) {
      log.info('Added.');
      return;
    }

    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    const { message } = err;

    if (message.includes(outputs.ADD_EXISTS)) {
      throw new CommandError(`Target name "${target.name}" is already taken.`);
    }

    // TODO: missing directory

    throw err;
  }
};

module.exports = webosCommandAdd;
