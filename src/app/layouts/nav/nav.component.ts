import { COOKIE_KEYS } from 'src/app/sign-in/sign-in.service';
/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Date: 11/04/23
 */

// imports statements
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COOKIE_OPTIONS } from 'ngx-cookie';
import { SignInService } from 'src/app/sign-in/sign-in.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(private signinService: SignInService, private router: Router, private cookieService: CookieService) {}

  signOut() {
    this.signinService.signOut();
    this.cookieService.deleteAll();
    console.log('sign out');
    console.log(COOKIE_KEYS.EMP_ID);
    // this is to clear the cookie when clicking the sign out button
    this.router.navigate(['/sign-in']);
  }
}
