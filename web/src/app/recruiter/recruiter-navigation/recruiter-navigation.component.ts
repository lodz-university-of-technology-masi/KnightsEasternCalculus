import { Component, OnInit } from '@angular/core';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-recruiter-navigation',
  templateUrl: './recruiter-navigation.component.html',
  styleUrls: ['./recruiter-navigation.component.scss']
})
export class RecruiterNavigationComponent implements OnInit {
  username = '';
  openFirstDropDown = false;
  openSecondDropDown = false;

  constructor(private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.username = this.authService.getUser().getUsername();
    }
  }

  logout(): void {
    this.authService.logOut();
  }

}
