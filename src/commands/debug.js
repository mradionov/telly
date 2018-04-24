const commandDebug = async (dependencies) => {
  const { commands } = dependencies;

  await commands.pack(dependencies);
  await commands.install(dependencies);
  await commands.launch(dependencies);
  await commands.inspect(dependencies);
};

module.exports = commandDebug;
