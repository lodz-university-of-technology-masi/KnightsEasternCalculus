import { Component, OnInit } from '@angular/core';
import {SolvableTest} from '../../model/solvable-test';
import {TestService} from '../../services/test.service';
import {TestStatus} from '../../model/solvable-test';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  testStatus = TestStatus;
  tests: SolvableTest[];

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
