const inquirer = require('inquirer');

const commandUse = async ({ cache }) => {
  const targets = cache.get('targets', []);
  if (targets.length === 0) {
    console.log('No targets available');
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
