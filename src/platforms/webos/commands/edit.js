const outputs = require('../outputs');


const webosCommandEdit = async ({ log, shell }, updatedTarget) => {
  log.info('Editing...');

  const command = {
    sdk: updatedTarget.sdk,
    bin: 'CLI/bin/ares-setup-device',
    args: [
      '--modify', updatedTarget.name,
      '--info', `"host=${updatedTarget.host}"`,
    ],
  };

  try {
    const { stdout, stderr } = await shell.execute(command);

    if (stdout.includes(outputs.EDIT_SUCCESS)) {
      log.info('Edited.');
      return;
    }

    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = webosCommandEdit;
