const mongoose = require('mongoose');

const userSchema = new mognoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: true
  },
  {
    timestamps: true
  }
});

module.exports = mongoose.model('Note', userSchema);
