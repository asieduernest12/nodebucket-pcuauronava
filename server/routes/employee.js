const { Employee } = require("../models/employee");
const { Task } = require("../models/task");

const app = require("express").Router();

app.get("/", async (req, res) => {
  res.send(await Employee.find());
});

app.get("/:empId", async (req, res) => {
  try {
    const [employee] = await Employee.find({ empId: req.params.empId });
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Employee API routes

app.post("/", async (req, res, next) => {
  const employee = await Employee.create({
    empId: req.body.empId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.json(employee);
});

app.delete("/:id", async (req, res, next) => {
  res.json(await Task.deleteOne({ _id: req.params.id }));
});

app.get("/api/employee/:empId/tasks", async (req, res) => {
  try {
    const [employee] = await Employee.find({ empId: req.params.empId });
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Task API routes

app.post("/:empId/tasks", async (req, res, next) => {
  const task = Task.create({
    title: req.body.title,
    content: req.body.content,
  });

  res.json(task);
});

app.get("/:empId/tasks", async (req, res, next) => {
  res.json(await Task.find({ empId: req.params.empId }));
});

app.delete("/:empId/tasks/:id", (req, res, next) => {
  Task.deleteOne({ _id: req.params.id });
});

module.exports = { employeeRoutes: app };
