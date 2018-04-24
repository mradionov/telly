const inquirer = require('inquirer');

const messages = require('../messages');
const outputs = require('../outputs');

const webosCommandConnect = async ({
  log, shell, target,
  CommandError, Deferred,
}) => {
  log.info('Connecting...');

  const command = {
    sdk: target.sdk,
    bin: 'ares-novacom',
    args: [
      '--getkey',
      '--device', target.name,
    ],
  };

  const deferred = new Deferred();

  const proc = shell.spawn(command);

  proc.stdout.on('data', async (data) => {
    const message = data.toString();

    if (message.includes(outputs.CONNECT_PASSPHRASE)) {
      const answers = await inquirer.prompt([{
        type: 'input',
        name: 'passphrase',
        message: 'Passphrase:',
      }]);

      const { passphrase } = answers;

      proc.stdin.write(passphrase);

      deferred.resolve();
      return;
    }

    log.error('UNHANDLED STDOUT', message);
  });


  proc.stderr.on('data', (data) => {
    const message = data.toString();
    const ignoredMessages = [
      'ares-novacom',
    ];

    if (ignoredMessages.includes(message)) {
      return;
    }

    if (message.includes(outputs.NO_SSH_KEY)) {
      deferred.reject(new CommandError(messages.CONNECTION_FAILED));
      return;
    }

    log.error('UNHANDLED STDERR', message);
  });

  proc.on('error', (err) => {
    deferred.reject(err);
  });

  return deferred.promise;
};

module.exports = webosCommandConnect;
