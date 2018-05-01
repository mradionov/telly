const pathHelper = require('path');

const fs = require('../../../lib/fs');

const { PLATFORM_DIR_PATH } = require('../../../config/paths');

const outputs = require('../outputs');

const tizenCommandAdd = async ({ log, shell }, target) => {
  log.info('Adding...');

  const platformDirName = `${target.platform}-cert`;
  const platformDirPath = pathHelper.join(PLATFORM_DIR_PATH, platformDirName);
  const certificateFileName = 'certificate.p12';
  const certificateFilePath = pathHelper.join(platformDirPath, certificateFileName);
  const certificateExists = await fs.exists(certificateFilePath);
  if (!certificateExists) {
    await fs.makeDir(platformDirPath);

    const certificateCommand = {
      sdk: target.sdk,
      bin: 'tools/ide/bin/tizen',
      args: [
        'certificate',
        '--alias', 'telly-certificate',
        '--filename', 'certificate',
        '--password', 'telly',
        '--', platformDirPath,
      ],
    };

    log.info('Creating certificate...');
    try {
      const { stdout, stderr } = await shell.execute(certificateCommand);
      if (stdout.includes(outputs.CERTIFICATE_SUCCESS)) {
        log.info('Certificate created.');
      } else {
        log.debug('UNHANDLED OUTPUT', { stdout, stderr });
      }
    } catch (err) {
      throw err;
    }
  }

  const securityProfileCreateCommand = {
    sdk: target.sdk,
    bin: 'tools/ide/bin/tizen',
    args: [
      'security-profiles', 'add',
      '--active',
      '--author', certificateFilePath,
      '--name', 'telly-security-profile',
      '--password', 'telly',
    ],
  };

  log.info('Creating security profile...');
  try {
    const { stdout, stderr } = await shell.execute(securityProfileCreateCommand);
    if (stdout.includes(outputs.SECURITY_PROFILE_SUCCESS)) {
      log.info('Security profile created and set active.');
    } else {
      log.debug('UNHANDLED OUTPUT', { stdout, stderr });
    }
  } catch (err) {
    throw err;
  }

  log.info('Added.');
};

module.exports = tizenCommandAdd;
