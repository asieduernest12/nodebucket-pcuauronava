import { Injectable } from '@angular/core';
import { TaskModel } from './task.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
// imported to use the http client (linked to post.service.ts) automatically to use the service

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: TaskModel[] = [];
  private tasksUpdated = new Subject<TaskModel[]>();
  //passing a payload of type TaskModel[]

  constructor(private http: HttpClient) {
    
   }
  

  getTasks() {
    this.http.get<{message: string, tasks: TaskModel[]}>('http://localhost:3000/api/tasks')
    .subscribe((taskData)=>{
      this.tasks = taskData.tasks;
      this.tasksUpdated.next([...this.tasks]);
    }); 
   }
   getTaskUpdateListener() {
      return this.tasksUpdated.asObservable();
      //return an observable
   }
   addTask(title: string, content: string) {
      const task: TaskModel = {
        // id: null,
         title: title, content: content
        };
      this.http.post<{message: string}>('http://localhost:3000/api/tasks', task)
      .subscribe((responseData) => {
        console.log(responseData.message);
        //responseData is named arbitrarily
        this.tasks.push(task);
      this.tasksUpdated.next([...this.tasks]);
      //passing a copy of the array
      });
      
    }
}
