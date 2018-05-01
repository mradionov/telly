const inquirer = require('inquirer');

const commandEdit = async (dependencies) => {
  const { target, targetRepository } = dependencies;

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Name:',
      default: target.name,
    },
    {
      type: 'input',
      name: 'host',
      message: 'Device IP address:',
      default: target.host,
    },
    {
      type: 'input',
      name: 'source',
      message: 'Source path:',
      default: target.source,
    },
    {
      type: 'input',
      name: 'sdk',
      message: 'SDK path:',
      default: target.sdk,
    },
  ];

  const answers = await inquirer.prompt(questions);
  const updatedTarget = answers;

  // TODO: if name changed
  // - check if already taken
  // - remove existing cache directories

  targetRepository.update(target.name, updatedTarget);
  await targetRepository.save();
};

module.exports = commandEdit;
