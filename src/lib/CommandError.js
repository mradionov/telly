class CommandError {
  constructor(...args) {
    this.name = 'CommandError';
    this.args = args;
  }
}

module.exports = CommandError;
