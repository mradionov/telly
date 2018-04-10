const inquirer = require('inquirer');

const { ALL_PLATFORMS } = require('../config/constants');

const questions = [
  {
    type: 'list',
    name: 'platform',
    choices: ALL_PLATFORMS,
    message: 'Platform:',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
  },
  {
    type: 'input',
    name: 'host',
    message: 'Device IP address:',
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

const commandAdd = async (dependencies) => {
  const { cache, platforms } = dependencies;

  const answers = await inquirer.prompt(questions);
  const target = answers;

  const platform = platforms[target.platform];

  try {
    await platform.add(dependencies, target);
  } catch (err) {
    throw err;
  }

  const targets = cache.get('targets', []);
  targets.push(target);
  cache.set('targets', targets);

  await cache.save();
};

module.exports = commandAdd;
