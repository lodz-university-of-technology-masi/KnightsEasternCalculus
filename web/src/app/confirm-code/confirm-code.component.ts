import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  code: string;
  password: string;
  confirmPass: string;
  email: string;
  invalidPass = false;
  passwordMatch = false;
  generalError = false;
  loading = false;

  constructor(public router: Router, public authService: AuthenticationRecruiterService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams.code;
    // todo "in case you can pass the username in the cognito email"
    // this.email = this.route.snapshot.queryParams.username;
  }

  confirmCode() {
    this.loading = true;
    this.invalidPass = false;
    this.generalError = false;
    if (this.password !== this.confirmPass) {
      this.loading = false;
      this.passwordMatch = true;
      return;
    }
    this.authService.confirmCode(this.email, this.code, this.password).subscribe(result => {
        if (result === 'success') {
          this.router.navigateByUrl('/register');
        }
      },
      error => {
        this.generalError = true;
        this.loading = false;
      });
  }
}
