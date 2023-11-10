/**
 Title: task.service.ts
 Author: Patrick C
 Date: 08/23/2023
 Description: Task Component Services
 */

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './item.interface';
import { Item } from './item.interface';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private cs: CookieService) {}

  getTasks(empId: number) {
    // return this.http
    // .get('/api/employees/' + empId + '/tasks')
    //this retrieves the tasks using the employee Id already loaded
    //using the cookie service
    // .subscribe((tasks: Task[]) => this.task$.next(tasks));
    return this.http.get('api/employees/' + empId + '/tasks');
  }

  addTask(empId: number, task: Item) {
    return this.http.post('api/employees/' + empId + '/tasks', { task });
    // .subscribe(() => this.getTasks());
  }

  updateTask(empId: number, task: Task) {
    return this.http
      .put('/api/employees/' + empId + '/tasks/' + task._id, {
        task,
      })
      .subscribe();
  }

  deleteTask(empId: number, taskId: string) {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
    // .subscribe(() => this.getTasks());
  }
}
