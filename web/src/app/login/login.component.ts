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
  loading = false;
  userUnknown = false;
  expired = false;

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
    this.expired = this.authService.wasExpired();
    this.authService.logOut();
  }

  login(): void {
    this.loading = true;
    this.userUnknown = false;
    this.authService.signIn(this.username, this.password).subscribe(result => {
      if (result === 'newPass') {
        this.router.navigateByUrl('/change-password');
      } else {
        if (this.authService.getGroups()[0] === 'recruiter') {
          this.router.navigateByUrl('/recruiter');
        } else if (this.authService.getGroups()[0] === 'client') {
          this.router.navigateByUrl('/applicant');
        }
      }
    }, (err) => {
      console.log(err);
      if(err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
        this.userUnknown = true;
      }
      this.loading = false;
    });
  }

}
