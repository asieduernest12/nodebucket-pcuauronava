import { Subject } from 'rxjs';
/**
  Title: task.service.ts
  Author: Patrick C
  Date: 08/23/2023
  Description: Task Component Services
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './item.interface';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  task$ = new Subject<Task[] | null>();
  constructor(private http: HttpClient, private cs: CookieService) {}

  getTasks(empId: number = parseInt(this.cs.get(COOKIE_KEYS.EMP_ID))) {
    return this.http
      .get('/api/employees/' + empId + '/tasks')
      .subscribe((tasks: Task[]) => this.task$.next(tasks));
  }

  addTask(empId: number, task: Task) {
    return this.http
      .post('api/employees/' + empId + '/tasks', { task })
      .subscribe(() => this.getTasks());
  }

  updateTask(task: Task) {
    return this.http
      .put('/api/employees/' + task.empId + '/tasks/' + task._id, { task })
      .subscribe(() => this.getTasks());
  }

  deleteTask(task: Task) {
    return this.http
      .delete('/api/employees/' + task.empId + '/tasks/' + task._id)
      .subscribe(() => this.getTasks());
  }
}
