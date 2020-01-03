import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  private code: string;
  private password: string;
  private email: string;

  constructor(private router: Router, private authService: AuthenticationRecruiterService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams.code;
  }

  confirmCode() {
    this.authService.confirmCode(this.email, this.code, this.password).subscribe( result => {
      if (result === 'success') {
        this.router.navigateByUrl('/');
      }
    });
  }
}
