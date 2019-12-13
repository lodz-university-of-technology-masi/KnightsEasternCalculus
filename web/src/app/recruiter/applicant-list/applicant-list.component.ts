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
  searchLastName: string;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit() {
    this.getInitialApplicants();
  }

  getInitialApplicants(): void {
    this.applicantService.getAllApplicants().subscribe(applicants => {this.applicants = applicants; console.log(JSON.stringify(applicants)); });
  }

  searchApplicants(): void {
    this.applicantService.getApplicants(this.searchLastName)
      .subscribe(applicants => this.applicants = applicants);
  }

}
