const fs = require('fs');

const mkdirp = require('mkdirp');
const xml2js = require('xml2js');

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

exports.readJSON = async (path, defaultValue = null) => {
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
  const json = JSON.stringify(data, null, 2);
  return this.writeFile(path, json);
};

exports.readXML = async (path, defaultValue = null) => {
  const xml = await this.readFile(path);

  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      resolve(result);
    });
  });
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

exports.exists = path => new Promise(resolve => fs.exists(path, resolve));
