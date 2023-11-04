import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { str } from 'ajv';

import { EmployeeModel } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // doneTasks: employee.doneTasks
  private employees: EmployeeModel[] = [];
  private employeesUpdated = new Subject<EmployeeModel[]>();
  //passing a payload of type EmployeeModel[]

  constructor(private http: HttpClient) {}
  getEmployees() {
    this.http
      .get<{ message: string; employees: any }>(
        'http://localhost:3000/api/employees'
      )
      .pipe(
        map((employeeData) => {
          return employeeData.employees.map((employee) => {
            return {
              empId: employee.empId,
              firstName: employee.firstName,
              lastName: employee.lastName,
              // todoTasks: employee.todoTasks,
              // doneTasks: employee.doneTasks
            };
          });
        })
      )
      .subscribe((transformedEmployees) => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
    //return an observable
  }
  addEmployee(empId: string, firstName: string, lastName: string) {
    const employee: EmployeeModel = {
      empId: empId,
      firstName: firstName,
      lastName: lastName,
      //, todoTasks: [], doneTasks: []
    };
    this.http
      .post<{ message: string; empId: string }>(
        'http://localhost:3000/api/employees',
        employee
      )
      .subscribe((responseData) => {
        const id = responseData.empId;
        employee.empId = id;
        // console.log(responseData.message);
        //responseData is named arbitrarily
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
        //passing a copy of the array
      });
  }

  deleteEmployee(empId: string) {
    this.http
      .delete('http://localhost:3000/api/employees/' + empId)
      .subscribe(() => {
        const updatedEmployees = this.employees.filter(
          (employee) => employee.empId !== empId
        );
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
      });
  }
  retrieveTasks() {
    // doneTasks: employee.doneTasks
    throw new Error('Method not implemented.');
  }
}
