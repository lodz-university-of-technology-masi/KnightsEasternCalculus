import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-link-generator',
  templateUrl: './link-generator.component.html',
  styleUrls: ['./link-generator.component.scss']
})
export class LinkGeneratorComponent implements OnInit {
  private mail: string;
  private loading = false;
  private userExists = false;
  private success = false;

  constructor(private router: Router, private authService: AuthenticationRecruiterService) { }

  ngOnInit() {
  }

  send() {
    this.loading = true;
    this.userExists = false;
    this.success = false;
    this.authService.sendMail(this.mail).subscribe(result => {
      this.success = true;
      this.loading = false;
      this.mail = '';
    }, err => {
      if (err.code === 'UsernameExistsException') {
        this.userExists = true;
      } else {
        console.log('error', err);
      }
      this.loading = false;
    });
  }
}
