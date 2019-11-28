import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.signIn(this.username, this.password).subscribe(() => {
      this.loginService.setUsername(this.username);
      this.loginService.setLogged(true);
      this.router.navigateByUrl('/');
    }, (err) => {
      console.log('err' + err.toString());
    });
  }

}
