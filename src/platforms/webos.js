const shell = require('../lib/shell');

exports.debug = async (target) => {
  const command = `${target.sdk} ares-inspect`;
  const { stdout, stderr } = await shell.run(command);

  console.log(stdout, stderr);
};
