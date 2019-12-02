import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthenticationRecruiterService, private router: Router) { }

  private username: string;
  private password: string;
  private email: string;
  private name: string;
  private surname: string;

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.username, this.password, this.name, this.surname, this.email).subscribe( () => {
      this.router.navigateByUrl('/confirm');
    }, (err) => {
      console.log('signup err' + err.toString());
      this.router.navigateByUrl('/signup');
    });
  }
}
