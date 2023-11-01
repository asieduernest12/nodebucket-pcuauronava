import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent {
  enteredEmpId = '';
  enteredFirstName = '';
  enteredLastName = '';

  constructor(public employeesService: EmployeeService) {}

  onAddEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.employeesService.addEmployee(
      form.value.empId,
      form.value.firstName,
      form.value.lastName
    );
    form.resetForm();
  }
}
