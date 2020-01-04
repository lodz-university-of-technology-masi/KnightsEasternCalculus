import { Component, OnInit } from '@angular/core';
import {TestInstance} from '../../model/test-instance';
import {TestService} from '../../services/test.service';
import {TestStatus} from '../../model/test-instance';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  testStatus = TestStatus;
  tests: TestInstance[];

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.testService.getAllUserTests('username').subscribe(tests => this.tests = tests);
  }

  solve(index) {
    console.log(index);
  }
}
