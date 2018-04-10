const childProcess = require('child_process');

class Shell {
  constructor({ log }) {
    this.log = log;
  }

  async execute(command) {
    return new Promise((resolve, reject) => {
      this.log.debug(command);
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
