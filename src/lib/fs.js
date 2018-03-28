const fs = require('fs');

const mkdirp = require('mkdirp');

exports.readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

exports.writeFile = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

exports.readJSON = async (path, defaultValue = {}) => {
  const json = await this.readFile(path);
  let data = defaultValue;
  try {
    data = JSON.parse(json);
  } catch (err) {
    // Default value will be returned if parse fails
  }
  return data;
};

exports.writeJSON = async (path, data) => {
  const json = JSON.stringify(data);
  return this.writeFile(path, json);
};

exports.makeDir = path => new Promise((resolve, reject) => {
  mkdirp(path, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});
