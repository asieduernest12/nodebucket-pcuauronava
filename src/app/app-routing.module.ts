/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: BaseLayoutComponent,
        children: [
          {
            path: '',
            component: HomeComponent
          }
        ]
        // title: 'Nodebucket: Home' // title for the home page
      }
      // {
      //   path: 'session',
      //   component: AuthLayoutComponent,
      //   children: [
      //     {
      //       path: 'not-found',
      //       component: NotFoundComponent
      //     }
      //   ]
      //   // title: 'Nodebucket: Home'
      // },
      //added the path for the not found component
      
      // to do: Check the path for the not found component
    ]
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  { path: 'about', component: AboutComponent },
  { path: 'admin-manager', component: AdminManagerComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'task-manager', component: TaskManagerComponent },
  { path: '***', component: NotFoundComponent }
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
