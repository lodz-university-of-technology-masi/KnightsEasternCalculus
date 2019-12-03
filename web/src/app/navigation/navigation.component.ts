import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  username = '';
  openFirstDropDown = false;
  openSecondDropDown = false;

  constructor(private authService: AuthenticationRecruiterService) {
  }

  ngOnInit() {
    this.authService.currUsername.subscribe(username => this.username = username);
  }

  logout(): void {
    this.authService.logOut();
  }

  generateLink() {

  }
}
