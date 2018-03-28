const inquirer = require('inquirer');

const questions = [
  {
    name: 'name',
    message: 'Name:',
    type: 'input',
  },
];

const commandAdd = async (cache) => {
  const answers = await inquirer.prompt(questions);
  const target = answers;

  await cache.load();

  const targets = cache.get('targets', []);
  targets.push(target);
  cache.set('targets', targets);

  await cache.save();
};

module.exports = commandAdd;
