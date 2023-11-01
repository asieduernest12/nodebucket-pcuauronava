const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  empId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  //   ,
  //   tasks: [
  //     { type: mongoose.Schema.Types.ObjectId, ref: "Task", autopopulate: true },
  //   ],
});

module.exports = mongoose.model("Employee", employeeSchema);
