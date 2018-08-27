import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../shared/employee.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../core/auth.service';
import {AppUser} from '../../model/app-user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  appUser: AppUser;


  constructor(public employeeService: EmployeeService, private tostr: ToastrService, private authService: AuthService) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }

  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.employeeService.insertEmployee(employeeForm.value);
    else
      this.employeeService.updateEmployee(employeeForm.value);
    this.resetForm(employeeForm);
    this.tostr.success('Submitted Successfully', 'Employee Register');
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null) {
      employeeForm.reset();
      this.employeeService.selectedEmployee = {
        $key: null,
        name: '',
        position: '',
        office: '',
        salary: 0
      };
    }
  }

  logout() {
    this.authService.logout();
  }

}
