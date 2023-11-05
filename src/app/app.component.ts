/**
 * Title: app.component.ts
 * Author: Professor Krasso
 * Date: 11/04/23
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
