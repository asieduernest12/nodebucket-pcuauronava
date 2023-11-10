/**
 * Title: employee.interface.ts
 * Author: Patrick C
 * Date: 08/16/2023
 * Description: Employee schema
 */

import { Task } from './item.interface';

export interface Employee {
  empId: number;
  todoTasks: Task[];
  doneTasks: Task[];
}
