const mongoose = require('./connection')
const {Employee} = require("./models/employee");
const {Task} = require("./models/task");

require("./connection");
// Seed 7 employees
async function seedDatabase() {
  await Employee.deleteMany({}).catch((error) => console.log(error));
  await Task.deleteMany({}).catch((error) => console.log(error));

  for (let i = 0; i <= 5; i++) {
    const employee = await Employee.create({
      name: `Employee ${i + 1}`,
      empId: 1007 + i,
      lastName: `Last ... Name ${i + 1}`,
      firstName: `First Name ${i + 1}`,
    });


    for (let j = 1; j <= 5; j++) {
      const task = await Task.create({
        // employee: employee._id,
        empId: employee.empId,
        title: `Task ${j} for Employee ${i}`,
        content: `Task ${j} for Employee ${i}`,
      });

    
    }
  }

  mongoose.connection.close();
}

seedDatabase();
