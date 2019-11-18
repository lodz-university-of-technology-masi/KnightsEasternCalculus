import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {SharingService} from '../services/sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService, private sharingService: SharingService) { }

  ngOnInit() {
    this.username = this.sharingService.getUsername();
  }

  login(): void {
    this.loginService.setUsername(this.username);
    this.loginService.setLogged(true);
    this.sharingService.setLogging(true);
    this.router.navigate(['/']);
  }

}
