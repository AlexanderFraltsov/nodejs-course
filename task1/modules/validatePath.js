const fs = require('fs');
const errorHandler = require('./errorHandler');

const validatePath = (inputPath, outputPath) => {
  try {
    /* eslint-disable */
    fs.accessSync(inputPath, fs.constants.F_OK);
    fs.accessSync(inputPath, fs.constants.R_OK);
    /* eslint-enable */
  } catch (err) {
    if (err.code === 'ENOENT') {
      errorHandler('Input file is not exist', 51, inputPath);
    }
    if (err.code === 'EPERM') {
      errorHandler('Input file is not readable', 52, inputPath);
    }
  }

  try {
    /* eslint-disable */
    fs.accessSync(outputPath, fs.constants.F_OK);
    fs.accessSync(outputPath, fs.constants.W_OK);
    /* eslint-enable */
  } catch (err) {
    if (err.code === 'ENOENT') {
      errorHandler('Output file is not exist', 53, outputPath);
    }
    if (err.code === 'EPERM') {
      errorHandler('Input file is not writable', 54, outputPath);
    }
  }
};

module.exports = validatePath;
