import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  tmp() {
    console.log(this.auth.getUsername());
    console.log(this.auth.getAccessToken());
  }
}
