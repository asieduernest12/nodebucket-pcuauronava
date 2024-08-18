/**
 * Title: tasks.component.ts
 * Author: Patrick Cuauro
 * Modified by: 
 * Date: 11/11/2023
 * Description: This is the component for the tasks page
 */

import {
  Component,
  TemplateRef,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './task.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee.interface';
import { Task } from './item.interface';
import { Item } from './item.interface';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { COOKIE_KEYS } from 'src/app/sign-in/sign-in.service';
import { MatDialog } from '@angular/material/dialog';
// import { MatCheckboxChange } from '@angular/material/checkbox';

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
  taskToEdit: null | Task;
  openTaskEditDialog: boolean = false;
  alertMessage: string = null;
  selectedTask: Task = null!;
  alertTitle: string = '';
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
  // this validates the input in the new task form

  editTaskFG = this.fb.group({
    title: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    _id: [
      '',
      Validators.compose([
        Validators.required,
        Validators.min(1007),
        Validators.max(1012),
      ]),
    ],
  });
  // this validates the input in the edit task form
  // the min and max values are the rank of the accepted task ids

  constructor(
    private cookieService: CookieService,
    private taskService: TaskService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {

    this.employee = {} as Employee;
    this.todoTasks = [];
    this.doneTasks = [];

    this.empId = parseInt(this.cookieService.get(COOKIE_KEYS.EMP_ID), 10);

    this.loadTasks();
    //this is to get all the tasks, referenced to taskService
  }

  loadTasks() {
    return this.taskService.getTasks(this.empId).subscribe({
      next: (tasks: any) => {
        this.employee = {} as Employee;
        this.todoTasks = tasks.filter(({ done }) => !done);
        this.doneTasks = tasks.filter(({ done }) => done);
      },
    });
  }
  addTask() {
    const title = this.newTaskFG.controls['title'].value;
    let newTask = this.getTask(title);
    this.taskService.addTask(this.empId, newTask).subscribe({
      next: (task: any) => {
        console.log('task added with id', task.id);
        this.newTaskFG.reset();
        this.loadTasks();
        this.hideAlert();
      },
    });
  }

  showDeleteDialog(
    task: Task,
    alertTemplate: TemplateRef<any>
  ) {
    this.selectedTask = task;
    this.alertTitle= 'Delete Task confirmation'
    this.alertMessage = task.title;
    this.dialog.open(alertTemplate);
  }

  onClose(){
    this.openTaskEditDialog = false
  }
  
  deleteTask(taskId: string) {
    console.log('Task Item:', taskId);

    this.taskService.deleteTask(this.empId, taskId).subscribe({
      next: (res: any) => {
        console.log('task deleted whit id:', taskId);

        this.todoTasks = this.todoTasks.filter((task) => task._id !== taskId);
        this.doneTasks = this.doneTasks.filter((task) => task._id !== taskId);
        this.hideAlert();

        // this is to filter the tasks in the two categories
      },
      error: (err) => {
        console.log('err', err);
        this.hideAlert();

        // this will show the error message in the console
      },
    });
  }

  // Drag and drop functionality

  drop(event: CdkDragDrop<any[], any[], Item>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //condition the items moved, if they stay in the same container
      console.log('Moved item in array', event.container.data);
      this.updateTaskList(this.empId, this.todoTasks, this.doneTasks);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //condition the items moved, if they are moved the linked container
      console.log('Transferred item in array', event.container.data);
      const task = JSON.parse(
        event.item.element.nativeElement.dataset['task']
      ) as any as Task;
      this.taskService
        .updateTask(this.empId, { ...task, done: !task.done })
        .subscribe(() => this.loadTasks());
    }
  }

  updateTaskList(empId: number, todoTasks: Item[], doneTasks: Item[]) {
    // this.taskService.updateTask(empId, todoTasks, doneTasks).subscribe({
    //   next: (res: any) => {
    //     console.log('Task updated successfully');
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //     this.hideAlert();
    //   },
    // });
  }
  hideAlert() {
    setTimeout(() => {}, 3000);
  }

  // updateTask(task: Task, $event: MatCheckboxChange) {
  //   const updatedTask = { ...task, done: $event.checked };
  //   this.taskService.updateTask(updatedTask);
  //this is to update the selected task
  // }

  getTask(title: string, empId = this.empId) {
    let task = { title, _id: undefined, empId } as Task;
    return task;
  }

  openDialogWithTemplateRef(task: Task) {
    this.editTaskFG.setValue({ title: task.title, _id: task._id });

    // this.dialog.open(templateRef);
    this.openTaskEditDialog = true
  }

  editTask(form: FormGroup) {
    const updatedTask: Task = form.value;
    const originalTask = [...this.doneTasks, ...this.todoTasks].find(
      (_task) => _task._id === updatedTask._id
    );

    //join the title with the other task values
    const taskData = { ...originalTask, ...updatedTask };

    this.taskService.updateTask(this.empId, taskData).subscribe({
      complete: () => {
        originalTask.title = updatedTask.title;
        this.dialog.closeAll();
        form.reset();
        this.loadTasks();
      },
    });
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
