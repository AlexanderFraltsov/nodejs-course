const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');
const path = require('path');

const infoPath = path.join(__dirname, '../logs/info.log');
const errorsPath = path.join(__dirname, '../logs/errors.log');

const winstonConsole = createLogger({
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.Console({ level: 'error' })
  ]
});

const winstonFile = createLogger({
  transports: [
    new transports.File({
      level: 'info',
      filename: infoPath,
      format: format.json()
    }),
    new transports.File({
      level: 'error',
      filename: errorsPath,
      format: format.json()
    })
  ]
});

/* eslint-disable-next-line no-unused-vars */
morgan.token('requestHumanReadable', (req, res) => {
  const { body } = req;
  if (!body) return null;
  const arr = Object.entries(body);
  return arr
    .map(parameter => {
      const [key, value] = parameter;
      if (typeof value === 'object') {
        const str = JSON.stringify(value);
        return `${key}: ${str}`;
      }
      return `${key}: ${value}`;
    })
    .join(', ');
});

const incomingLogger = morgan((tokens, req, res) => {
  const url = tokens.url(req, res);
  const method = tokens.method(req, res);
  const request = tokens.requestHumanReadable(req, res);

  const logToConsole = `incoming request:
  {
    url: ${url},
    method: ${method},
    body: ${request ? `{${request}}` : null}
  }`;
  const logToFile = `{ url: ${url}, method: ${method}, body: ${
    request ? `{${request}}` : null
  } }`;

  winstonConsole.log('info', logToConsole);
  winstonFile.log('info', logToFile);
});

module.exports = { incomingLogger };
