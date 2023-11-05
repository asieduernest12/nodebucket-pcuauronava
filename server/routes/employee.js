const { Employee } = require("../models/employee");
const { Task } = require("../models/task");

const app = require("express").Router();

// Employee API routes

app.post("/", async (req, res, next) => {
  const employee = await Employee.create({
    empId: req.body.empId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.json(employee);
});

app.delete("/:empId", async (req, res, next) => {
  res.json(await Employee.deleteOne({ empId: req.params.empId }));
});

app.get("/:empId", async (req, res) => {
  try {
    const [employee] = await Employee.find({ empId: req.params.empId });
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Task API routes [post: create, get: read, put: update, delete: delete]

app.post("/:empId/tasks", async (req, res, next) => {
  const { task } = req.body;
  const newTask = await Task.create({ ...task, empId: req.params.empId });
  res.json(newTask);
});

app.get("/:empId/tasks", async (req, res, next) => {
  res.json(await Task.find({ empId: req.params.empId }));
});

app.delete("/:empId/tasks/:id", async (req, res, next) => {
  res.json(await Task.deleteOne({ _id: req.params.id }));
});

app.put("/:empId/tasks/:id", async (req, res, next) => {
  const { task } = req.body;
  res.json(await Task.updateOne({ _id: req.params.id }, task));
});

module.exports = { employeeRoutes: app };
