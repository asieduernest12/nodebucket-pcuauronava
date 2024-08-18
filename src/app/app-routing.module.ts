/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Date: 11/04/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';

//
import { SignInGuard } from './sign-in.guard';
import { TasksComponent } from './tasks/tasks.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [SignInGuard],
    children: [
      {
        path: '',
        component: HomeComponent, // children: [{ path: '', component: HomeComponent }]
      },
      { path: 'about', component: AboutComponent },
     
      { path: 'calendar', component: CalendarComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: 'tasks',
        component: TasksComponent,
      },
    ],
  },
  // { path : '', component: BaseLayoutComponent,
  // children: [
  //   {
  //     path: '', component: HomeComponent,
  //   },
  //   {
  //     path: 'home', component: HomeComponent,
  //   },
  //   {
  //     path: 'contact', component: ContactComponent,
  //   },
  //   {
  //     path: 'about', component: AboutComponent,
  //   },
  //   {
  //     path: 'not-found', component: NotFoundComponent
  //   }
  // ]

  // },

  { path: 'not-found', component: NotFoundComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
