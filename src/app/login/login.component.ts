import { Component } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';
import { LoginResponse } from '../LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {
    user: '',
    password: ''
  };

  loginResponse: LoginResponse | undefined;

  constructor(
    private userService: UserService) { }

  login() {
    this.userService.login(this.user).subscribe(lr => this.loginResponse=lr);
  }

}
