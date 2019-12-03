import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from '../../model/applicant';
import {ApplicantService} from '../../services/applicant.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {
  applicant: Applicant;

  constructor(private route: ActivatedRoute, private applicantService: ApplicantService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => this.fillProperties(value.get('id')));
  }

  fillProperties(id: string): void {
    this.applicantService.getApplicant(id).subscribe(applicant => this.applicant = applicant);
  }

  formatDate(date: Date, format: string, locale: string): string {
    return formatDate(date, format, locale);
  }
}
