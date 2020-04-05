const ERRORS = {
  BAD_REQUEST: { code: 400, message: 'Bad request' },
  TASK_NOT_FOUND: { code: 404, message: 'Task not found' },
  USER_NOT_FOUND: { code: 404, message: 'User not found' },
  BOARD_NOT_FOUND: { code: 404, message: 'Board not found' }
};

const MESSAGES = {
  DELETE_TASK_SUCCESSFULL_MESSAGE: 'The task has been deleted',
  DELETE_USER_SUCCESSFULL_MESSAGE: 'The user has been deleted',
  DELETE_BOARD_SUCCESSFULL_MESSAGE: 'The board has been deleted'
};

module.exports = { ERRORS, MESSAGES };
