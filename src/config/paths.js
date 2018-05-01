const os = require('os');
const pathHelper = require('path');

const xdgBasedir = require('xdg-basedir');

const userDirPath = xdgBasedir.cache || os.tempdir();

const moduleDirName = '.telly';
const moduleDirPath = pathHelper.join(userDirPath, moduleDirName);

const cacheFileName = 'cache.json';

const packDirName = 'pack';
const packDirPath = pathHelper.join(moduleDirPath, packDirName);

const platformDirName = 'platform';
const platformDirPath = pathHelper.join(moduleDirPath, platformDirName);

exports.CACHE_PATH = pathHelper.join(moduleDirPath, cacheFileName);
exports.PACK_DIR_PATH = packDirPath;
exports.PLATFORM_DIR_PATH = platformDirPath;
