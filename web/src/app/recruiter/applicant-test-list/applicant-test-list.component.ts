import { Component, OnInit } from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestInstance} from '../../model/test-instance';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-applicant-test-list',
  templateUrl: './applicant-test-list.component.html',
  styleUrls: ['./applicant-test-list.component.scss']
})
export class ApplicantTestListComponent implements OnInit {

  private tests: TestInstance[];

  constructor(private testService: TestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( value => this.testService.getTestInstances(value.get('id')).subscribe( (result: Response) => {
      this.tests = JSON.parse(JSON.stringify(result.body)) as TestInstance[];
    }));
  }

}
