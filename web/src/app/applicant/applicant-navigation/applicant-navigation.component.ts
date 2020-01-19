import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-applicant-navigation',
  templateUrl: './applicant-navigation.component.html',
  styleUrls: ['./applicant-navigation.component.scss']
})
export class ApplicantNavigationComponent implements OnInit {

  constructor(public authService: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logOut();
  }
}
