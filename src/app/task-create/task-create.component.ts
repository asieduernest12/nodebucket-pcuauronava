import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  
  enteredTitle = '';
  enteredContent = '';

  constructor(public tasksService: TaskService) { }

  onAddTask(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    this.tasksService.addTask(form.value.title, form.value.content);
    form.resetForm();
  }

}
