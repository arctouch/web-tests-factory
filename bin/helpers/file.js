/* eslint-disable */

const fs = require('fs');
const path = require('path');

function createDirectoryAndFile(fileName, contents, callback) {
  return new Promise((resolve, reject) => {
    const dirName = path.dirname(fileName);
    const pathAsArray = dirName.split(path.sep);
    _createDirectoryAndFile(pathAsArray, '', () => {
      fs.open(fileName, 'w+', (error, data) => {
        fs.writeFile(fileName, contents, (error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      });
    });
  });
}

function _createDirectoryAndFile(pathAsArray, pathSoFar, createFile) {
  if (!pathAsArray || pathAsArray.length === 0) {
    createFile();
    return;
  }

  const dir = pathAsArray.shift();
  pathSoFar = pathSoFar + dir + path.sep;
  fs.access(pathSoFar, (error) => {
    if (error) { // directory does not exist
      fs.mkdir(pathSoFar, (error) => {
        if (!error) {
          _createDirectoryAndFile(pathAsArray, pathSoFar, createFile);
        }
      });
    } else {
      _createDirectoryAndFile(pathAsArray, pathSoFar, createFile);
    }
  });
}

module.exports = {
  createDirectoryAndFile,
};
