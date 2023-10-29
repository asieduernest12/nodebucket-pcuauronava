import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskModel } from '../task.model';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  
  tasks: TaskModel[] = [];
  private taskSub: Subscription;
  tasksService: TaskService;

  constructor(public TaskService: TaskService) { }

  ngOnInit() {
    this.TaskService.getTasks();
    this.taskSub = this.TaskService.getTaskUpdateListener()
    .subscribe((tasks: TaskModel[]) => {
      this.tasks = tasks;
      //this is a hard concept to grasp
    });
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
    //to prevent memory leaks
  }

}
