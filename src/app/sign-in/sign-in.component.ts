import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { get } from 'mongoose';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private signinService: SignInService
  ) {
    console.log(this.cookieService.get('session_user'));
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      employeeId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }
  get form() {
    return this.signinForm.controls;
  }

  onSubmit() {
    const formValues = this.signinForm.value;
    //this is how we capture the values of the form

    const employeeId = parseInt(formValues.employeeId);

    this.signinService.signin(employeeId).subscribe({
      next: (employee) => {
        this.router.navigate(['/']);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
