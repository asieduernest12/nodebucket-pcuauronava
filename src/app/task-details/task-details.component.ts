import { Component } from '@angular/core';
import { TaskModel } from '../task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  task: TaskModel;
  constructor(
    private dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskModel }
  ) {
    this.task = data.task;
  }
  selectDesiredTask() {
    alert('test');
  }
  ngOnInit() {}
}
