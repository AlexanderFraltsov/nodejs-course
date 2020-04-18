const { createLogger } = require('winston');

const { configConsole, configFile } = require('./logger-config');
const { getLogsFromRequest } = require('../utils');
const { handleError } = require('../common/error');

const winstonConsole = createLogger(configConsole);
const winstonFile = createLogger(configFile);

/* eslint-disable-next-line no-unused-vars */
const incomingLogger = (req, res, next) => {
  const { logToConsole, logToFile } = getLogsFromRequest(req);

  winstonConsole.log('info', logToConsole);
  winstonFile.log('info', logToFile);
  next();
};

const processErrorLogger = (message, errorType) => {
  const time = new Date().toUTCString();
  const errString = `${time} | ${errorType}: ${message}`;

  winstonConsole.log('error', errString);
  winstonFile.log('error', errString);
  return winstonFile;
};

/* eslint-disable-next-line no-unused-vars */
const errorLogger = (err, req, res, next) => {
  const { statusCode, message } = handleError(err, res);

  const level = statusCode >= 400 && statusCode < 500 ? 'warn' : 'error';

  const { logToFile } = getLogsFromRequest(req);
  const time = new Date().toUTCString();
  const errString = `${time} | Error ${statusCode}: ${message}`;
  winstonConsole.log(level, errString);
  winstonFile.log(level, `${errString} | Request: ${logToFile}`);
};

module.exports = { incomingLogger, processErrorLogger, errorLogger };
