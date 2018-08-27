import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenService: AuthService, private router: Router, private userService: UserService) {
    this.authenService.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.authenService.login();
    //window.location.assign('/employee');
  }


}
