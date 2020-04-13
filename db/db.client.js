const mongoose = require('mongoose');

const connectToDB = cb => {
  mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-pxfzs.mongodb.net/rest?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', async () => {
    console.log('DB connected!');
    await db.dropDatabase();
    cb();
  });
};

module.exports = { connectToDB };
