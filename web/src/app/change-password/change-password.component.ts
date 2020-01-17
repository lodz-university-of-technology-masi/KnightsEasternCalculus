import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private password: string;
  private passwordRepeat: string;
  private passwordMatch = false;
  private loading = false;
  private invalidPassword = false;

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  changePassword() {
    this.loading = true;
    this.invalidPassword = false;
    if (this.password !== this.passwordRepeat) {
      this.passwordMatch = true;
      this.loading = false;
      return;
    }
    this.authService.setNewPassword(this.password).subscribe( result => {
      this.router.navigateByUrl('/');
    }, error => {
      if (error.code === 'InvalidPasswordException') {
        this.invalidPassword = true;
      } else {
        console.log(error);
      }
      this.loading = false;
    });
  }
}
