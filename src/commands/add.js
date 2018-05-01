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
    message: 'SDK path:',
  },
];

const commandAdd = async (dependencies) => {
  const { CommandError, platforms, targetRepository } = dependencies;

  const answers = await inquirer.prompt(questions);
  const target = answers;

  const existingTarget = targetRepository.findOneByName(target.name);
  if (existingTarget !== undefined) {
    throw new CommandError(`Target with name "${target.name}" already exists`);
  }

  const platform = platforms[target.platform];

  try {
    await platform.add(dependencies, target);
  } catch (err) {
    throw err;
  }

  targetRepository.add(target);
  await targetRepository.save();
};

module.exports = commandAdd;
