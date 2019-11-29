import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  private code: string;

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  confirmCode(){
    console.log(this.code);
    this.authService.confirmAuth(this.code).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      console.log('wrong code. err: ' + err);
      this.router.navigateByUrl('/confirm');
    });
  }
}
