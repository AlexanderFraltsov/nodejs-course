const { createLogger, format, transports } = require('winston');
const path = require('path');

const infoPath = path.join(__dirname, '../logs/info.log');
const errorsPath = path.join(__dirname, '../logs/errors.log');

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
  if (!body) return null;
  const arr = Object.entries(body);
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
  const { url, method, body } = req;
  const request = requestHumanReadable(body);

  const logToConsole = `incoming request:
  {
    url: ${url},
    method: ${method},
    body: ${request}
  }`;

  const logToFile = `{ url: ${url}, method: ${method}, body: ${request} }`;

  winstonConsole.log('info', logToConsole);
  winstonFile.log('info', logToFile);

  next();
};

module.exports = { incomingLogger };
