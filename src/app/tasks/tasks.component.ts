/**
  Title: tasks.component.ts
  Author: Patrick C
  Date: 08/16/2023
  Description: Tasks Component Logic
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee.interface';
import { Task } from './item.interface';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { COOKIE_KEYS } from 'src/app/sign-in/sign-in.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ITask } from './task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  employee: Employee;
  empId: number;
  todoTasks: Task[];
  doneTasks: Task[];
  //retrieves the tasks from the employee

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
    //subscriber to filter done tasks from undone
    //this might be the answer of how to filter the tasks

    this.taskService.getTasks();
    //this is to get all the tasks, referenced to taskService
  }
  updateTask(task: Task, $event: MatCheckboxChange) {
    const updatedTask = { ...task, done: $event.checked };
    this.taskService.updateTask(updatedTask);
    //this is to update the selected task
  }
  addTask($event: SubmitEvent) {
    const newTask = {
      empId: parseInt(this.cookieService.get(COOKIE_KEYS.EMP_ID)),
      title: this.newTaskFG.value.title,
    };

    this.taskService.addTask(newTask.empId, newTask);
    this.newTaskFG.reset();
  }
  ngOnInit(): void {
    
    
    
    
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // drag and drop functionality
}

// this section is a backup in case I delete something by mistake
// employee: Employee;
// empId: number;
// todoTasks: Task[];
// doneTasks: Task[];
// errorMessage: string;
// successMessage: string;

// newTaskFG: FormGroup = this.fb.group({
//   title: [
//     null,
//     Validators.compose([
//       Validators.required,
//       Validators.minLength(3),
//       Validators.maxLength(50),
//     ]),
//   ],
// });

// constructor(
//   private cookieService: CookieService,
//   public taskService: TaskService,
//   private fb: FormBuilder
// ) {
//   this.taskService.task$.subscribe((tasks) => {
//     this.todoTasks = tasks.filter((t) => t.done !== true);
//     this.doneTasks = tasks.filter((t) => t.done === true);
//   });

//   this.taskService.getTasks();
// }

// updateTask(task: Task, $event: MatCheckboxChange) {
//   const updatedTask = { ...task, done: $event.checked };
//   this.taskService.updateTask(updatedTask);
// }

// addTask($event:SubmitEvent){
//   const newTask = {
//     empId: parseInt(this.cookieService.get(COOKIE_KEYS.EMP_ID)),
//     title: this.newTaskFG.value.title,
//   };

//   this.taskService.addTask(newTask.empId, newTask);
//   this.newTaskFG.reset();
// }
// }
