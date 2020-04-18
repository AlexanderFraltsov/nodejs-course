const { NOT_FOUND } = require('http-status-codes');

const { ErrorHandler } = require('../../common/error');
const tasksRepo = require('./task.db.repository');
const { TASK_NOT_FOUND } = require('../../common/constants').ERRORS;
const Task = require('./task.model');

const getAll = async id => {
  const tasks = await tasksRepo.getAll();

  if (!tasks) return [];
  return tasks.filter(({ boardId }) => boardId === id);
};

const postOne = async (id, taskFields) => {
  const task = await tasksRepo.postOne({ ...taskFields, boardId: id });
  return Task.toResponse(task);
};

const getOneById = async (id, taskId) => {
  const task = await tasksRepo.getOneById(taskId);
  if (!task) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  return Task.toResponse(task);
};

const putOneById = async (id, taskId, task) => {
  const newTask = await tasksRepo.putOneById(taskId, task);

  if (!newTask) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  return Task.toResponse(newTask);
};

const deleteOneById = async (id, taskId) => {
  const task = await tasksRepo.getOneById(taskId);

  if (!task) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  const isDeleted = await tasksRepo.deleteOneById(taskId);
  return isDeleted;
};

module.exports = {
  getAll,
  postTask: postOne,
  getTask: getOneById,
  putTask: putOneById,
  deleteTask: deleteOneById
};
