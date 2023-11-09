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

require("./connection");

const bodyParser = require("body-parser");



// Create the Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { employeeRoutes } = require("./routes/employee");

// CORS configuration
const cors = require("cors");
app.use(cors());
// CORS configuration

// Configure the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

require('../swaggerDefinition')(app);
// The line of code require('../swaggerDefinition')(app); is used to load the Swagger definition into the Express application. The require() function is used to import the Swagger definition module from the ../swaggerDefinition file. The (app) part of the code is used to pass the Express application instance to the Swagger definition module. This allows the Swagger definition to be used to generate API documentation and to interact with the API.

app.use("/api/employees", employeeRoutes);

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
