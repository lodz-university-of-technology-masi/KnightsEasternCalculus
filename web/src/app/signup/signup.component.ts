import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthenticationService, private loginService: LoginService, private router: Router) { }

  private username: string;
  private password: string;

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.username, this.password).subscribe( () => {
      this.loginService.setUsername(this.username);
      this.loginService.setLogged(true);
      this.router.navigateByUrl('/confirm');
    }, (err) => {
      console.log('signup err' + err.toString());
      this.router.navigateByUrl('/signup');
    });
  }
}
