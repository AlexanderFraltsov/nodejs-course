const { PORT } = require('./common/config');
const app = require('./app');
const { processErrorLogger } = require('./middlewares/logger');

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
