const inquirer = require('inquirer');

const commandUse = async ({ cache, log }) => {
  const targets = cache.get('targets', []);
  if (targets.length === 0) {
    log.info('No targets available. Please #add one.');
    return false;
  }

  const questions = [{
    type: 'list',
    name: 'name',
    choices: targets,
    message: 'Target:',
  }];

  const answer = await inquirer.prompt(questions);
  const { name } = answer;

  cache.set('use', name);

  await cache.save();

  return true;
};

module.exports = commandUse;
