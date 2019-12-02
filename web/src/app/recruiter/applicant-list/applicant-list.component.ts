import { Component, OnInit } from '@angular/core';
import {Applicant} from '../../model/applicant';
import {ApplicantService} from '../../services/applicant.service';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {
  applicants: Applicant[];
  searchFirstName: string;
  searchLastName: string;
  searchCity: string;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit() {
    this.getInitialApplicants();
  }

  getInitialApplicants(): void {
    this.applicantService.getLatestApplicants().subscribe(applicants => this.applicants = applicants);
  }

  searchApplicants(): void {
    this.applicantService.getApplicants(this.searchFirstName, this.searchLastName, this.searchCity)
      .subscribe(applicants => this.applicants = applicants);
  }

}
