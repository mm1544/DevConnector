// File for MongoDB connection

const mongoose = require('mongoose');
const config = require('config');
// to get "mongoURI" value from "default.json" file
const db = config.get('mongoURI');

// Connecting to MongoDB. It will return a promise. We could use ".then.catch" syntax, but instead will use "async/await". Making async arrow fn.
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
