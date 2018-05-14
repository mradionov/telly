const childProcess = require('child_process');
const pathHelper = require('path');

class Shell {
  constructor({ log }) {
    this.log = log;
  }

  async execute({ sdk = '', bin = '', args = [] } = {}) {
    const baseCommand = pathHelper.join(sdk, bin);
    const cleanArgs = args.map(arg => arg.replace(' ', '\\ '));
    const cleanArgsStr = cleanArgs.join(' ');

    const command = `${baseCommand} ${cleanArgsStr}`;

    this.log.debug(command);

    return new Promise((resolve, reject) => {
      childProcess.exec(command, (err, stdout, stderr) => {
        if (err) {
          // Even if process finishes with non-zero status code it might still
          // have and output.
          // eslint-disable-next-line no-param-reassign
          err.stdout = stdout;
          // eslint-disable-next-line no-param-reassign
          err.stderr = stderr;
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }

  spawn({ sdk = '', bin = '', args = [] } = {}) {
    const baseCommand = pathHelper.join(sdk, bin);
    const cleanArgs = args.map(arg => arg.replace(' ', '\\ '));
    const cleanArgsStr = cleanArgs.join(' ');

    const fullCommand = `${baseCommand} ${cleanArgsStr}`;

    this.log.debug(fullCommand);

    const proc = childProcess.spawn(baseCommand, cleanArgs);

    return proc;
  }
}

module.exports = Shell;
