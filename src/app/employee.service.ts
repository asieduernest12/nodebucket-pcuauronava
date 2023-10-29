import { Injectable } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: EmployeeModel[] = [];
  private employeesUpdated = new Subject<EmployeeModel[]>();
  //passing a payload of type EmployeeModel[]

  constructor(private http: HttpClient ) {

   }
   getEmployees() {
    this.http.get<{message: string, employees: EmployeeModel[]}>('http://localhost:3000/api/employees')
    .subscribe((employeeData)=>{
      this.employees = employeeData.employees;
      this.employeesUpdated.next([...this.employees]);
    }); 
   }
   getEmployeeUpdateListener() {
      return this.employeesUpdated.asObservable();
      //return an observable
   }
   addEmployee(firstName: string, lastName: string) {
      const employee: EmployeeModel = {
        // id: null,
         firstName: firstName, lastName: lastName, todoTasks: [], doneTasks: []
        };
      this.http.post<{message: string}>('http://localhost:3000/api/employees', employee)
      .subscribe((responseData) => {
        console.log(responseData.message);
        //responseData is named arbitrarily
        this.employees.push(employee);
      this.employeesUpdated.next([...this.employees]);
      //passing a copy of the array
      });
      
    }
}
