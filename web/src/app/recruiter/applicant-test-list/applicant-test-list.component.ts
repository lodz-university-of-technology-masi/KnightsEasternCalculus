import { Component, OnInit } from '@angular/core';
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-applicant-test-list',
  templateUrl: './applicant-test-list.component.html',
  styleUrls: ['./applicant-test-list.component.scss']
})
export class ApplicantTestListComponent implements OnInit {

  constructor(private testService: TestService) { }

  ngOnInit() {
  }

}
