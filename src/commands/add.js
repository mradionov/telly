const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
  },
  {
    type: 'input',
    name: 'reference',
    message: 'Reference:',
  },
  {
    type: 'input',
    name: 'source',
    message: 'Source path:',
  },
  {
    type: 'input',
    name: 'sdk',
    message: 'SDK CLI path:',
  },
];

const commandAdd = async ({ cache }) => {
  const answers = await inquirer.prompt(questions);
  const target = answers;

  const targets = cache.get('targets', []);
  targets.push(target);
  cache.set('targets', targets);

  await cache.save();
};

module.exports = commandAdd;
