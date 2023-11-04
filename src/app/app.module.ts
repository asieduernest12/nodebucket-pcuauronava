import { CookieModule } from 'ngx-cookie';
/**
 * Title: app.module.ts
 * Author: Professor Krasso
 * Modified by: Patrick Cuauro
 * Date: 10/18/23
 * Description: App module
 */

// imports statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { SideNavComponent } from './layouts/sidenav/sidenav.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//add the required imports

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
//
import { MatDividerModule } from '@angular/material/divider';
//
import { HttpClientModule } from '@angular/common/http';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
//
import { TasksComponent } from './task-manager/tasks/tasks.component';
//

import { CalendarComponent } from './calendar/calendar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminManagerComponent } from './admin-manager/admin-manager.component';
//
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { EmployeeService } from './employee.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
//

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    NavComponent,
    FooterComponent,
    NotFoundComponent,
    AuthLayoutComponent,
    TaskManagerComponent,
    // CalendarComponent,
    SideNavComponent,
    AboutComponent,
    ContactComponent,
    AdminManagerComponent,
    TaskCreateComponent,
    TaskListComponent,
    TasksComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CookieModule,
  ],
  providers: [TaskService, EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
