import {Component, OnInit} from '@angular/core';
import {SolvableTest, TestStatus} from '../../model/solvable-test';
import {TestService} from '../../services/test.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  testStatus = TestStatus;
  tests: SolvableTest[];

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this.testService.getAllUserTests('username').subscribe(tests => this.tests = tests);
    // this.testService.getAllTests().subscribe( (result: Response) => {
    //   this.tests = JSON.parse(JSON.stringify(result.body));
    //   console.log(this.tests);
    // });

  }

  solve(id, timestamp) {
    this.router.navigate(['applicant/solve_test', id + '=' + timestamp]);
  }

}
