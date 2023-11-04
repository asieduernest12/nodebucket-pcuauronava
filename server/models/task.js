const mongoose = require("mongoose");
const { Employee } = require("./employee");

const taskSchema = new mongoose.Schema(
  {
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
    title: String,
    content: String,
  },
  {
    virtuals: {
      employee: {
        get: async () => {
          const [employee] = await Employee.find({ empId: this.empId });
          return employee;
        },
      },
    },
  }
);

module.exports = { Task: mongoose.model("Task", taskSchema) };
