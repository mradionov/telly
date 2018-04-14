const webosCommandAdd = async ({ log, shell }, target) => {
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
    log.debug('UNHANDLED OUTPUT', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = webosCommandAdd;
