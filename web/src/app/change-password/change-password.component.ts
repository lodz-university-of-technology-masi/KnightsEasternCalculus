import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationUserService} from '../services/authentication-user.service';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  private password; string;
  private name: string;
  private surname: string;

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  changePassword() {
    this.authService.setNewPassword(this.password, this.name, this.surname).subscribe( result => {
      this.router.navigateByUrl('/');
    }, error => {
      alert('Error: ' + error.toString());
      console.log(error);
    });
  }
}
