const mongoose = require('mongoose');

// Schema describes what fields new model is going to hold
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Will use Gravatar, it allows to attach profile-image to the email
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// model(..) takes model-name and the name of a Schema
module.exports = User = mongoose.model('user', UserSchema);
