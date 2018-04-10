const inquirer = require('inquirer');

const { PLATFORM_TIZEN, PLATFORM_WEBOS } = require('../config/constants');

const platforms = [
  PLATFORM_TIZEN,
  PLATFORM_WEBOS,
];

const questions = [
  {
    type: 'list',
    name: 'platform',
    choices: platforms,
    message: 'Platform:',
  },
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
    name: 'id',
    message: 'App ID:',
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
