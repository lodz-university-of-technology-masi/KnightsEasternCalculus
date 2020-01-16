import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthenticationRecruiterService) {
    console.log(this.authService.getAccessToken());
  }

  ngOnInit() {
  }

}
