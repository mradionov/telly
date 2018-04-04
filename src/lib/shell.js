const childProcess = require('child_process');

exports.run = async command => new Promise((resolve, reject) => {
  childProcess.exec(command, (err, stdout, stderr) => {
    if (err) {
      reject(err);
    } else {
      resolve({ stdout, stderr });
    }
  });
});
