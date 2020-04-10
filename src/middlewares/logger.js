const { createLogger } = require('winston');

const { configConsole, configFile } = require('./logger-config');
const { getStringFromObject } = require('../utils');

const winstonConsole = createLogger(configConsole);
const winstonFile = createLogger(configFile);

/* eslint-disable-next-line no-unused-vars */
const incomingLogger = (req, res, next) => {
  const { url, method, body, query } = req;

  const request = getStringFromObject(body);
  const params = getStringFromObject(query);

  const logToConsole = `incoming request:
  {
    url: ${url},
    method: ${method},
    body: ${request},
    query_params: ${params}
  }`;

  const logToFile = `{ url: ${url}, method: ${method}, body: ${request}, query_params: ${params} }`;

  winstonConsole.log('info', logToConsole);
  winstonFile.log('info', logToFile);

  next();
};

const processErrorLogger = (message, errorType) => {
  const time = new Date().toUTCString();
  const errString = `${time} | ${errorType}: ${message}`;

  winstonConsole.log('error', errString);
  winstonFile.log('error', errString);
};

module.exports = { incomingLogger, processErrorLogger };
