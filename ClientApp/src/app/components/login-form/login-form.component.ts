import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { user } from 'src/app/constants';
import { UsersService } from 'src/app/services';
import { verifyPass, verifyUsername } from 'src/app/shared-methods/validations';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  
  showLogin = null;
  showLoginInfoTitle = false;
  showError = false;

  constructor(private usersService: UsersService, private _formBuilder: FormBuilder) {
    if (localStorage.getItem('userId')) {
      window.location.href = '/Movies';
    } else {
      this.showLogin = true;
      
      this.loginForm = this._formBuilder.group({
        username: [''],
        password: [''],
      });

      this.signupForm = this._formBuilder.group({
        username: [''],
        password: [''],
      });
    }
  };

  login() {
    this.showError = false;

    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (verifyUsername(username) && verifyPass(password)) {
        const user: Partial<user> = {
          username: username,
          password: password,
        };
    
        this.usersService.login(user)
          .subscribe((result: any) => {
            if (result != null) {
              localStorage.setItem('userId', result);
              localStorage.setItem('username', username);
    
              window.location.href = '/Movies';
            }
          }, error => { this.showError = true; });
      }
    }
  }

  signup() {
    this.showError = false;

    if (this.signupForm.valid) {
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;

      if (verifyPass(password) && verifyUsername(username)) {
        const user: Partial<user> = {
          username: username,
          password: password,
        };

        this.usersService.signup(user)
          .subscribe((result: any) => {
            if (result) {
              this.showLogin = true;
              this.showLoginInfoTitle = true;
            }
          });
      }
    }
  }
}
