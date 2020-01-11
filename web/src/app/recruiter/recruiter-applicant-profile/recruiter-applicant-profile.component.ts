import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Applicant} from '../../model/applicant';
import {ApplicantService} from '../../services/applicant.service';

@Component({
  selector: 'app-recruiter-applicant-profile',
  templateUrl: './recruiter-applicant-profile.component.html',
  styleUrls: ['./recruiter-applicant-profile.component.scss']
})
export class RecruiterApplicantProfileComponent implements OnInit {
  replicant: Applicant;

  constructor(private route: ActivatedRoute, private replicantService: ApplicantService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(value =>
      this.replicantService.getApplicant(value.get('id')).subscribe(replicant => this.replicant = replicant));
  }
}
