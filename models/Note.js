const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mognoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    default: 'Employee'
  }],
  active: {
    type: Boolean,
    default: true
  },
});

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500
})

module.exports = mongoose.model('User', noteSchema);
