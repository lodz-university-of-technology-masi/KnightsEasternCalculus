import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticatorComponent} from 'aws-amplify-angular/dist/src/components/authenticator/authenticator/authenticator.factory';
import {AuthenticationUserService} from '../../services/authentication-user.service';

@Component({
  selector: 'app-link-generator',
  templateUrl: './link-generator.component.html',
  styleUrls: ['./link-generator.component.scss']
})
export class LinkGeneratorComponent implements OnInit {
  private mail: string;
  private password: string;

  constructor(private router: Router, private authService: AuthenticationUserService) { }

  ngOnInit() {
  }

  send() {
    this.authService.signUp(this.mail, this.password);
  }
}
