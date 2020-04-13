const Board = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({}).exec();
  return boards;
};

const getOneById = async id => {
  return Board.findById(id);
};

const postOne = async board => {
  const b = await Board.create(board);
  return b;
};

const putOneById = async (id, board) => {
  return Board.updateOne({ _id: id }, board);
};

const deleteOneById = async id => {
  const isDeleted = (await Board.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
