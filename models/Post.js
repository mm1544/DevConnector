const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // Want Post to be connected to the User, therefore "user" will reference to existing user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  // IF user deletes its account, he has to be able to NOT delete the Post if he wants to.
  // Name of user
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  // Array user objects, it will contain users' IDs. Single user will be allowed to like certain post just once.
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
