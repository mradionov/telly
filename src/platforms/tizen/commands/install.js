const tizenCommandInstall = async ({ log, shell, target }, packDirPath) => {
  log.info('Installing...');

  const command = {
    sdk: target.sdk,
    bin: 'tools/ide/bin/tizen',
    args: [
      'install',
      '--', packDirPath,
    ],
  };
};

module.exports = tizenCommandInstall;
