import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.username = this.loginService.getUsername();
  }

  login(): void {
    this.loginService.setUsername(this.username);
    this.loginService.setLogged(true);
    this.loginService.setLogging(true);
    this.router.navigate(['/']);
  }

  signUp(): void {

  }

}
