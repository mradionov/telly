const os = require('os');
const pathHelper = require('path');

const xdgBasedir = require('xdg-basedir');

const userDirPath = xdgBasedir.cache || os.tempdir();
const moduleDirName = '.telly';
const moduleDirPath = pathHelper.join(userDirPath, moduleDirName);

const cacheFileName = 'cache.json';

exports.CACHE_PATH = pathHelper.join(moduleDirPath, cacheFileName);
exports.PACK_DIR_PATH = pathHelper.join(moduleDirPath, 'pack');
