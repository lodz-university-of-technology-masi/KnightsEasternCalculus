import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  private code: string;

  constructor(private router: Router, private authService: AuthenticationService, private loginService: LoginService) { }

  ngOnInit() {
  }

  confirmCode(){
    console.log(this.code);
    this.authService.confirmAuth(this.code).subscribe(() => {
      this.loginService.setLogged(true);
      this.router.navigateByUrl('/');
    }, (err) => {
      console.log('wrong code. err: ' + err);
      this.router.navigateByUrl('/confirm');
    });
  }
}
