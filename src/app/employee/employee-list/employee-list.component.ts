import { Component } from '@angular/core';
import { EmployeeModel } from '../../employee.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../../task-details/task-details.component';

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

  // working on this
  // showTaskDetails(_id: string) {
  //   // this.task = this.TasksService.getTask(isbn);
  //   this.task = this.tasks.find(task => task._id === _id);
  //   //this function will be used to open the dialog window

  //   const dialogRef = this.dialog.open(TaskDetailsDialogComponent, {
  //     data: {
  //       task: this.task
  //     },
  //     disableClose: true,
  //     width: '800px'
  //   });
  //   console.log(this.task);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'confirm'){
  //         this.task = null;
  //       }
  //     });
  // }
  retrieveTasks() {
    this.EmployeeService.retrieveTasks();
    console.log('retrieveTasks() called');
  }

  ngOnDestroy() {
    this.employeeSub.unsubscribe();
    //to prevent memory leaks
  }
}
