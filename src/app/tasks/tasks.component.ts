/**
  Title: tasks.component.ts
  Author: Patrick C
  Date: 08/16/2023
  Description: Tasks Component Logic
*/

import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee.interface';
import { Task } from './item.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { COOKIE_KEYS } from 'src/app/sign-in/sign-in.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  employee: Employee;
  empId: number;
  todoTasks: Task[];
  doneTasks: Task[];
  errorMessage: string;
  successMessage: string;

  newTaskFG: FormGroup = this.fb.group({
    title: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
  });

  constructor(
    private cookieService: CookieService,
    public taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskService.task$.subscribe((tasks) => {
      this.todoTasks = tasks.filter((t) => t.done !== true);
      this.doneTasks = tasks.filter((t) => t.done === true);
    });

    this.taskService.getTasks();
  }

  updateTask(task: Task, $event: MatCheckboxChange) {
    const updatedTask = { ...task, done: $event.checked };
    this.taskService.updateTask(updatedTask);
  }

  addTask($event:SubmitEvent){
    const newTask = {
      empId: parseInt(this.cookieService.get(COOKIE_KEYS.EMP_ID)),
      title: this.newTaskFG.value.title,
    };

    this.taskService.addTask(newTask.empId, newTask);
    this.newTaskFG.reset();
  }
}
