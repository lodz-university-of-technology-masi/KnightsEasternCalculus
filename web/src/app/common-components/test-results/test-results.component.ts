import {Component, Input, OnInit} from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestInstance} from '../../model/test-instance';
import {Applicant} from '../../model/applicant';
import {ApplicantService} from '../../services/applicant.service';
import {Experience} from '../../model/experience';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {
  @Input() testTimestamp: string;
  @Input() applicantId: string;
  test: TestInstance;
  applicant: Applicant;

  constructor(private testService: TestService, private applicantService: ApplicantService) { }

  ngOnInit() {
    this.testService.getTestInstance(this.applicantId, this.testTimestamp).subscribe(test => this.test = JSON.parse(JSON.stringify(test)));
    this.applicantService.getApplicant(this.applicantId).subscribe(applicant => this.applicant = applicant);
    }

}
