class Logger {
  constructor(tag = '') {
    this.tag = tag ? `[${tag}]` : '';
  }

  // Without tag and verbosity level
  // eslint-disable-next-line class-methods-use-this
  pure(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }

  info(...args) {
    // eslint-disable-next-line no-console
    console.log(this.tag, 'INFO', ...args);
  }

  debug(...args) {
    // eslint-disable-next-line no-console
    console.log(this.tag, 'DEBUG', ...args);
  }

  warn(...args) {
    // eslint-disable-next-line no-console
    console.warn(this.tag, 'WARN', ...args);
  }

  error(...args) {
    // eslint-disable-next-line no-console
    console.error(this.tag, 'ERROR', ...args);
  }
}

module.exports = Logger;
