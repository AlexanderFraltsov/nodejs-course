const bcrypt = require('bcrypt');

const usersRepo = require('./user.db.repository');
const tasksRepo = require('../tasks/task.db.repository');

const User = require('./user.model');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

const getOneById = async id => {
  const result = await usersRepo.getOneById(id);
  if (result) {
    return User.toResponse(result);
  }
};

const postOne = async user => {
  const { password } = user;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await usersRepo.postOne({ ...user, password: hashedPassword });
  return User.toResponse(result);
};

const putOneById = async (id, user) => {
  const result = await usersRepo.putOneById(id, user);
  if (result) {
    return User.toResponse(result);
  }
};

const deleteOneById = async userId => {
  const allTasks = await tasksRepo.getAll();

  const tasks = allTasks.filter(task => task.userId === userId);

  for (const task of tasks) {
    await tasksRepo.putOneById(task.id, { ...task, userId: null });
  }

  const isDeleted = await usersRepo.deleteOneById(userId);

  return isDeleted;
};

module.exports = {
  getAll,
  getUser: getOneById,
  postUser: postOne,
  putUser: putOneById,
  deleteUser: deleteOneById
};
