import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SignInGuard implements CanActivate {
  
  constructor(private router: Router, private cookieService: CookieService) {

   }
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
      const sessionUser = this.cookieService.get('session_user');
      if(sessionUser) {
        return true;
      } else {
        this.router.navigate(['/session/sign-in']);
        // logged in so return true
        return false;
      }
  }
};