/**
 * Title: employee.interface.ts
 * Author: Patrick Cuauro
 * Modified by: 
 * Date: 11/11/2023
 * Description: Model for employee
 */

import { Task } from './item.interface';

export interface Employee {
  empId: number;
  todoTasks: Task[];
  doneTasks: Task[];
}
