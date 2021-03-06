const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { incomingLogger, errorLogger } = require('./middlewares/logger');
const checkToken = require('./middlewares/check-token');
const handleNonExistentRoutes = require('./middlewares/handle-non-existent-routes');

const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(incomingLogger, checkToken);

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(handleNonExistentRoutes, errorLogger);

module.exports = app;
