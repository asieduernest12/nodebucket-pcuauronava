const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

module.exports = mongoose.model('Task', taskSchema);