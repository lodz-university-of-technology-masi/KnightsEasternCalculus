import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recruiter-applicant-profile',
  templateUrl: './recruiter-applicant-profile.component.html',
  styleUrls: ['./recruiter-applicant-profile.component.scss']
})
export class RecruiterApplicantProfileComponent implements OnInit {
  applicantId: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => this.applicantId = value.get('id'));
  }
}
