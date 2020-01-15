import { Component, OnInit } from '@angular/core';
import {TestInstance} from '../../model/test-instance';
import {TestService} from '../../services/test.service';
import {TestStatus} from '../../model/test-instance';
import {Router} from '@angular/router';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  testStatus = TestStatus;
  tests: TestInstance[];

  constructor(private testService: TestService, private router: Router, private auth: AuthenticationRecruiterService) {}

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.testService.getTestInstances(this.auth.getUser().getUsername()).subscribe( (result: Response) => {
      this.tests = JSON.parse(JSON.stringify(result.body));
      console.log(this.tests);
    });

  }

  solve(id, timestamp) {
    this.router.navigate(['applicant/solve-test', id + '=' + timestamp]);
  }

}
