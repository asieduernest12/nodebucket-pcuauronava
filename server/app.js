/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 8/5/2023
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
//
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

// MongoDB connection string
// const connString = 'mongodb://localhost/nodebucket'
// Still working on this part

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allows any domain to access our resources
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  ); // Which kind of headers are allowed
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
  ); // Which kind of requests are allowed
  next();// Allows the request to continue to the next middleware in line
}); 

// Task API routes

app.post("/api/tasks", (req, res, next) => {
  const task = req.body;
  console.log(task);
  res.status(201).json({
      message: 'Task added successfully'
  });
});

app.get('/api/tasks',(req, res, next) => {
  const tasks = [{
  id: 'fadf12421l',
  title: 'First server-side task',
  content: 'This is coming from the server'
  },
  {
      id: 'ksajflaj132',
      title: 'Second server-side task',
      content: 'This is coming from the server!'
  }];
  res.status(200).json({
      message: 'Tasks fetched successfully!',
      tasks: tasks
  });
});

// Employee API routes

app.post("/api/employees", (req, res, next) => {
  const employee = req.body;
  console.log(employee);
  res.status(201).json({
      message: 'Employee added successfully'
  });
});

app.get('/api/employees',(req, res, next) => {
  const employees = [{
  id: 'fadf12421l',
  firstName: 'Michael',
  lastName: 'Inserver'
  },
  {
      id: 'ksajflaj132',
      firstName: 'Linda',
      lastName: 'Routed'
  }];
  res.status(200).json({
      message: 'Employees fetched successfully!',
      employees: employees
  });
});

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application