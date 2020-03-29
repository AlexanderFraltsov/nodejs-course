const errorHandler = (type, code, message) => {
  process.exitCode = code;
  throw new Error(`${type}! ${message}`);
};

module.exports = errorHandler;
