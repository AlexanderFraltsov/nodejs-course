const User = require('./user.model');

const getAll = async () => {
  const users = await User.find({}).exec();
  return users.map(User.toResponse);
};

const getOneById = async id => {
  const user = await User.findById(id);
  return user !== null ? user : undefined;
};

const postOne = async data => {
  const user = await User.create(data);
  return user;
};

const putOneById = async (id, data) => {
  await User.updateOne({ _id: id }, data);
  return getOneById(id);
};

const deleteOneById = async id => {
  const isDeleted = (await User.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
