const { trimEndSlashes } = require('../../../utils/string');

const webosCommandAdd = async ({ log, shell }, target) => {
  let command = `${trimEndSlashes(target.sdk)}/`;
  command += 'ares-setup-device';
  command += ` --add ${target.name}`;
  command += ` --info "name=${target.name}"`;
  command += ` --info "host=${target.host}"`;
  command += ' --info "port=9922"';
  command += ' --info "username=prisoner"';
  command += ' --info "password="';

  try {
    const { stdout, stderr } = await shell.execute(command);
    log.debug('out', { stdout, stderr });
  } catch (err) {
    throw err;
  }
};

module.exports = webosCommandAdd;
