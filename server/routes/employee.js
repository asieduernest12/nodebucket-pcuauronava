/**
 * Title: employee.js
 * Author: Patrick Cuauro
 * Modified by: 
 * Date: 11/11/2023
 * Description: Routes for the APIs
 */
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
/**
 * @swagger
 * /:empId/tasks:
 *   post:
 *     summary: Create a new task for an employee.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: empId
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: body
 *         name: task
 *         description: The task object to create.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *             title:
 *               type: string
 *             content:
 *               type: string
 *             done:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Successfully created a new task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request. Invalid input or missing parameters.
 *       404:
 *         description: Employee not found for empId.
 *       500:
 *         description: Internal server error.
 *
 */

app.post("/:empId/tasks", async (req, res, next) => {
  const { task } = req.body;
  const newTask = await Task.create({ ...task, empId: req.params.empId });
  res.json(newTask);
  console.log("task posted");
});

/**
 * @swagger
 * /:empId/tasks:
 *   get:
 *     summary: Get tasks for a specific employee.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: empId
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks for the employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request. Invalid input or missing parameters.
 *       404:
 *         description: No tasks found for the employee.
 *       500:
 *         description: Internal server error.
 */

app.get("/:empId/tasks", async (req, res, next) => {
  res.json(await Task.find({ empId: req.params.empId }));
});

/**
 * @swagger
 * /:empId/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID for a specific employee.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: empId
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the task.
 *       400:
 *         description: Bad request. Invalid input or missing parameters.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */

app.delete("/:empId/tasks/:id", async (req, res, next) => {
  res.json(await Task.deleteOne({ _id: req.params.id }));
});

/**
 * @swagger
 * /:empId/tasks/{id}:
 *   put:
 *     summary: Update a task by ID for a specific employee.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: empId
 *         description: Employee ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: id
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: task
 *         description: The updated task object.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *             title:
 *               type: string
 *             content:
 *               type: string
 *             done:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated the task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request. Invalid input or missing parameters.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
app.put("/:empId/tasks/:id", async (req, res, next) => {
  const { task } = req.body;
  res.json(await Task.updateOne({ _id: req.params.id }, task));
});

module.exports = { employeeRoutes: app };
