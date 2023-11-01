const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  // description: String,
  // employee: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Employee',
  // },
  title: String,
  content: String,
});

module.exports = mongoose.model("Task", taskSchema);
