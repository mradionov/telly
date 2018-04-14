const childProcess = require('child_process');
const pathHelper = require('path');

class Shell {
  constructor({ log }) {
    this.log = log;
  }

  async execute({ sdk = '', bin = '', args = [] } = {}) {
    let command = pathHelper.join(sdk, bin);
    command += ' ';
    command += args.join(' ');

    this.log.debug(command);

    return new Promise((resolve, reject) => {
      childProcess.exec(command, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
}

module.exports = Shell;
