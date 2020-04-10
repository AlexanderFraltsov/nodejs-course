const { PORT } = require('./common/config');
const app = require('./app');
const { processErrorLogger } = require('./middlewares/logger');

// For testing uncaughtException
/*
setTimeout(() => {
  throw new Error('Oops!');
}, 1500)
*/

// For testing unhandledRejection
/*
setTimeout(() => {
  Promise.reject(new Error('Oops!'));
}, 1500)
*/

process
  .on('unhandledRejection', err => {
    processErrorLogger(err.message, 'Unhandled Rejection');
  })
  .on('uncaughtException', err => {
    processErrorLogger(err.message, 'Uncaught Exception');
    const { exit } = process;
    exit(1);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
