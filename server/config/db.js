const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB started....');
  } catch (err) {
    console.error(err.message);
    //exit with failer
    process.exit(1);
  }
};

module.exports = connectDB;
