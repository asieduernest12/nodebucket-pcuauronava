const mongoose = require("mongoose");
const { Employee } = require("./employee");

const taskSchema = new mongoose.Schema({
  description: String,
  empId: {
    required: true,
    type: Number,
    validate: {
      validator: async (empId) => {
        return (await Employee.find({ empId })).length === 1;
      },
      message: "employee not found for empId",
    },
  },
  title: {
    type: String,
    required: true,
  },
  content: String,
  done: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

taskSchema.pre("save", async function () {
  const [employee] = await Employee.find({ empId: this.empId });
  this.employee = employee._id;
});

taskSchema.post("save", async function () {
  const [employee] = await Employee.find({ empId: this.empId });
  employee.tasks.push(this._id);
  employee.save();
  return this.employee.empId;
});

taskSchema.post("remove", async function () {
  const [employee] = await Employee.find({ empId: this.empId });
  employee.tasks.pull(this._id);
  employee.save();
});

module.exports = { Task: mongoose.model("Task", taskSchema) };
