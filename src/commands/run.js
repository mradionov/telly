const commandRun = async (dependencies) => {
  const { commands } = dependencies;

  await commands.connect(dependencies);
  await commands.pack(dependencies);
  await commands.install(dependencies);
  await commands.launch(dependencies);
};

module.exports = commandRun;
