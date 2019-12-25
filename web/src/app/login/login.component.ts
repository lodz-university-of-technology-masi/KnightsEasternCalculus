import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {}

  login(): void {
    this.authService.signIn(this.username, this.password).subscribe(result => {
      if (result === 'newPass') {
        this.router.navigateByUrl('/change-password');
      } else {
        this.router.navigateByUrl('/');
      }
    }, (err) => {
      console.log('err' + err.toString());
    });
  }

}
