import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

export enum COOKIE_KEYS {
  NAME = 'fullname',
  EMP_ID = 'empId',
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient, private cs: CookieService) {}

  signin(empId: number) {
    return this.http.get('/api/employees/' + empId).pipe(
      tap((employee) => {
        this.cs.set(COOKIE_KEYS.EMP_ID, employee['empId']);
        this.cs.set(COOKIE_KEYS.NAME, employee['fullname']);
        return employee;
      })
    );
  }

  signOut() {
    return this.cs.deleteAll();
  }
}
