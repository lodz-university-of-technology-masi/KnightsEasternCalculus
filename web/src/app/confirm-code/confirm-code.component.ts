import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import {Router} from '@angular/router';
import {AuthenticationUserService} from '../services/authentication-user.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  private code: string;
  private name: string;
  private surname: string;
  private password: string;
  private username: string;

  constructor(private router: Router, private authService: AuthenticationUserService) { }

  ngOnInit() {
  }

  confirmCode(){
    this.authService.confirmCode(this.username, this.code, this.password, this.name, this.surname).subscribe(result => {
      console.log('confirmation success', result);
    }, err => {
      console.log('conf err', err);
    });
  }
}
