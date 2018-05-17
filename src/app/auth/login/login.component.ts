import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLoginService, LoggedInCallback } from '../../services/aws/login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.html'
})

export class LoginComponent implements LoggedInCallback, OnInit {
  public isLogged: boolean;
  public isWaiteResponse: boolean;
  public loginForm: FormGroup;
  public user = {
    email: '',
    password: ''
  };

  constructor(public userLoginService: UserLoginService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.loginForm = this.fb.group(this.user);
  }
  // blocked redirection if user is logged in
  public isLoggedIn(message: string, isLoggedIn: boolean): void {
    this.isLogged = isLoggedIn;
    this.isWaiteResponse = false;
  }

  public login(event: Event): void {
    event.preventDefault();

    this.isWaiteResponse = true;

    this.userLoginService.authenticate(this.user.email, this.user.password, this);
  }
  public logout() { // TODO need to move anywhere
    this.userLoginService.logOut();
    this.isLogged = false;
  }
}


