/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/sign-in/sign-in.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(private signinService: SignInService, private router: Router) {}

  signOut() {
    this.signinService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
