import { Component } from '@angular/core';
import { EmployeeModel } from '../../employee.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees: EmployeeModel[] = [];
  private employeeSub: Subscription;
  employeesService: EmployeeService;

  constructor(public EmployeeService: EmployeeService) {}

  ngOnInit() {
    this.EmployeeService.getEmployees();
    this.employeeSub =
      this.EmployeeService.getEmployeeUpdateListener().subscribe(
        (employees: EmployeeModel[]) => {
          this.employees = employees;
          //this is a hard concept to grasp
        }
      );
  }

  onDelete(empId: string) {
    this.EmployeeService.deleteEmployee(empId);
  }

  ngOnDestroy() {
    this.employeeSub.unsubscribe();
    //to prevent memory leaks
  }
}
