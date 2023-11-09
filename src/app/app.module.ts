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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavComponent } from './layouts/nav/nav.component';
import { SideNavComponent } from './layouts/sidenav/sidenav.component';

//add the required imports

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
//
import { MatDividerModule } from '@angular/material/divider';
//
import { HttpClientModule } from '@angular/common/http';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
//
import { TasksComponent } from './tasks/tasks.component';
//

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
//
import { MatExpansionModule } from '@angular/material/expansion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
    // CalendarComponent,
    SideNavComponent,
    AboutComponent,
    ContactComponent,

    TasksComponent,

    BaseLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
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
    MatListModule,
    MatCheckboxModule,
    DragDropModule
  ],
  providers: [ EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
