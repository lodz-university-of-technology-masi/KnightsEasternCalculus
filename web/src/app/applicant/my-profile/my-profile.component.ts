import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  applicantId: string;

  constructor(private authService: AuthenticationRecruiterService) {

  }

  ngOnInit() {
    this.applicantId = this.authService.getUserId();
  }

}
