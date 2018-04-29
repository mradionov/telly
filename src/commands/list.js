const commandList = async ({ log, targets }) => {
  const line = targets.map(target =>
    `- ${target.name} [${target.platform}] ${target.host}`);
  const message = line.join('\n');

  log.info('Targets:');
  log.pure(message);
};

module.exports = commandList;
