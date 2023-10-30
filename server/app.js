/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 8/5/2023
 */
"use strict";

// Require statements
const express = require("express");
const createServer = require("http-errors");
const path = require("path");
//
const bodyParser = require("body-parser");

require("./connection");
const Employee = require('./models/employee')
const Task = require("./models/task");
// schema for the tasks collection

// Create the Express app
const app = express();

const cors = require("cors");
app.use(cors());
// CORS configuration

// Configure the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // Allows any domain to access our resources
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   ); // Which kind of headers are allowed
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   ); // Which kind of requests are allowed
//   next(); // Allows the request to continue to the next middleware in line
// });

// Task API routes

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/employees/:empId/tasks", async (req, res) => {
  try {
    // const tasks = await Task.find({ employee:{ req.params.empId} });
    // find the task where the empId field on the employee document matches the empId parameter
    const tasks = await Task.find({ 'employee.empId': req.params.empId });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/api/employees/:empId", async (req, res) => {
  try {
    const [employee] = await Employee.find({ empId: req.params.empId });
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post("/api/tasks", (req, res, next) => {
//   const task = req.body;
//   console.log(task);
//   res.status(201).json({
//       message: 'Task added successfully'
//   });
// });
//example using only the server side

app.post("/api/tasks", (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    content: req.body.content,
  });
  task.save();
  console.log(task);
  res.status(201).json({
    message: "Task added successfully",
  });
});

// example using the MongoDB database

app.get("/api/tasks", (req, res, next) => {
  const tasks = [
    {
      id: "fadf12421l",
      title: "First server-side task",
      content: "This is coming from the server",
    },
    {
      id: "ksajflaj132",
      title: "Second server-side task",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Tasks fetched successfully!",
    tasks: tasks,
  });
});

// Employee API routes

// app.post("/api/employees", (req, res, next) => {
//   const employee = req.body;
//   console.log(employee);
//   res.status(201).json({
//       message: 'Employee added successfully'
//   });
// });

// app.get('/api/employees',(req, res, next) => {
//   const employees = [{
//   id: 'fadf12421l',
//   firstName: 'Michael',
//   lastName: 'Inserver'
//   },
//   {
//       id: 'ksajflaj132',
//       firstName: 'Linda',
//       lastName: 'Routed'
//   }];
//   res.status(200).json({
//       message: 'Employees fetched successfully!',
//       employees: employees
//   });
// });

// error handler for 404 errors
app.use(function (req, res, next) {
  next(createServer(404)); // forward to error handler
});

// error handler for all other errors
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500); // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

module.exports = app; // export the Express application
