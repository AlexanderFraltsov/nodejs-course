const { createLogger, format, transports } = require('winston');
const path = require('path');

const infoPath = path.join(__dirname, '../../logs/logs-common.log');
const errorsPath = path.join(__dirname, '../../logs/logs-errors.log');

const winstonConsole = createLogger({
  format: format.combine(format.colorize(), format.cli()),
  transports: [new transports.Console()]
});

const winstonFile = createLogger({
  format: format.json(),
  transports: [
    new transports.File({
      level: 'info',
      filename: infoPath
    }),
    new transports.File({
      level: 'error',
      filename: errorsPath
    })
  ]
});

const requestHumanReadable = body => {
  const arr = Object.entries(body);
  if (arr.length === 0) return null;
  return `{${arr
    .map(parameter => {
      const [key, value] = parameter;
      if (typeof value === 'object') {
        const str = JSON.stringify(value);
        return `${key}: ${str}`;
      }
      return `${key}: ${value}`;
    })
    .join(', ')}}`;
};

/* eslint-disable-next-line no-unused-vars */
const incomingLogger = (req, res, next) => {
  const { url, method, body, query } = req;

  const request = requestHumanReadable(body);
  const params = requestHumanReadable(query);

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
