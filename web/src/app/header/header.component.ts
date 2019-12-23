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
    this.auth.getUsername().subscribe( username => console.log(username) );
    console.log(this.auth.getAccessToken());
  }

}
