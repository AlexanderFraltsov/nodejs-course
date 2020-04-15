const Board = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({}).exec();
  return boards.map(Board.toResponse);
};

const getOneById = async id => {
  const board = await Board.findById(id);
  return board !== null ? board : undefined;
};

const postOne = async data => {
  const board = await Board.create(data);
  return board;
};

const putOneById = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return getOneById(id);
};

const deleteOneById = async id => {
  const isDeleted = (await Board.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
