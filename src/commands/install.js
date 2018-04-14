const pathHelper = require('path');

const fs = require('../lib/fs');

const { PACK_DIR_PATH } = require('../config/paths');

const commandInstall = async (dependencies) => {
  const { platform, target } = dependencies;

  const targetPackDirPath = pathHelper.join(PACK_DIR_PATH, target.name);
  await fs.makeDir(targetPackDirPath);

  return platform.install(dependencies, targetPackDirPath);
};

module.exports = commandInstall;
