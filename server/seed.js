const mongoose = require('mongoose');
const Employee = require('./models/employee');
const Task = require('./models/task');

require('./connection')
// Seed 7 employees
async function seedDatabase() {
  await Employee.deleteMany({}).catch((error) => console.log(error));
  await Task.deleteMany({}).catch((error) => console.log(error));


  for (let i = 0; i <= 5; i++) {
    const employee = new Employee({
      name: `Employee ${i + 1}`,
      empId: 1007 + i,
      lastName: `Last Name ${i + 1}`,
      firstName: `First Name ${i + 1}`,
    });

    await employee.save();

    for (let j = 1; j <= 5; j++) {
      const task = new Task({
        description: `Task ${j} for Employee ${i}`,
        employee: employee._id,
      });

      await task.save();

      employee.tasks.push(task);
      await employee.save();
    }
  }

  mongoose.connection.close();
}

seedDatabase();
