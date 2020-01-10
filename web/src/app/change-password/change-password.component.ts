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

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  changePassword() {
    if(this.password !== this.passwordRepeat) {
      this.passwordMatch = true;
      return;
    }
    this.authService.setNewPassword(this.password).subscribe( result => {
      this.router.navigateByUrl('/');
    }, error => {
      alert('Error: ' + error.toString());
      console.log(error);
    });
  }
}
