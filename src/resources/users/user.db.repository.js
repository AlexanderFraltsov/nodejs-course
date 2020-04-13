const User = require('./user.model');

const getAll = async () => {
  const users = await User.find({}).exec();
  return users;
};

const getOneById = async id => {
  return User.findById(id);
};

const postOne = async user => {
  return User.create(user);
};

const putOneById = async (id, user) => {
  return User.updateOne({ _id: id }, user);
};

const deleteOneById = async id => {
  const isDeleted = (await User.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
