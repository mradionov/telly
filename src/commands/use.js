const inquirer = require('inquirer');

const commandUse = async (dependencies) => {
  const {
    cache, log, platforms, targetRepository,
  } = dependencies;

  if (targetRepository.isEmpty()) {
    log.info('No targets available. Please #add one.');
    return;
  }

  const targets = targetRepository.findAll();

  const questions = [{
    type: 'list',
    name: 'name',
    choices: targets,
    message: 'Target:',
  }];

  const answer = await inquirer.prompt(questions);
  const { name } = answer;

  const target = targetRepository.findOneByName(name);
  const platform = platforms[target.platform];

  cache.set('use', name);

  await cache.save();
};

module.exports = commandUse;
