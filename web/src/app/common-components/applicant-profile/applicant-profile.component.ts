import {Component, Input, OnInit} from '@angular/core';
import {Applicant} from '../../model/applicant';
import {ApplicantService} from '../../services/applicant.service';
import { formatDate } from '@angular/common';
import * as Globals from '../../app-consts';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {
  applicant: Applicant;
  baseUrl = Globals.apiBaseUrl;
  imageLoading = true;
  @Input() applicantId: string;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit() {
    this.fillProperties(this.applicantId);
  }

  onImageLoad() {
    this.imageLoading = false;
  }

  fillProperties(id: string): void {
    this.applicantService.getApplicant(id).subscribe(applicant => this.applicant = applicant);
  }

  formatDate(date: Date, format: string, locale: string): string {
    return formatDate(date, format, locale);
  }

}
