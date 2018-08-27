import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeComponent} from './employees/employee/employee.component';
import {EmployeeListComponent} from './employees/employee-list/employee-list.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './core/auth.service';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthGuardService} from './core/auth-guard.service';
import {UserService} from './core/user.service';
import {AdminAuthGuardService} from './core/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCsfLH4YwJ8HCwjZ-MApLNzJdmPtvBFeQM',
      authDomain: 'angularcrud-f678e.firebaseapp.com',
      databaseURL: 'https://angularcrud-f678e.firebaseio.com',
      projectId: 'angularcrud-f678e',
      storageBucket: 'angularcrud-f678e.appspot.com',
      messagingSenderId: '485704874920'
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'employee', component: EmployeesComponent, canActivate: [AuthGuardService,AdminAuthGuardService]}
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
