import { Component, OnInit } from '@angular/core';
import {TestService} from '../../services/test.service';
import {ActivatedRoute} from '@angular/router';
import {TestInstance} from '../../model/test-instance';

@Component({
  selector: 'app-check-tests',
  templateUrl: './check-tests.component.html',
  styleUrls: ['./check-tests.component.scss']
})
export class CheckTestsComponent implements OnInit {

  private tests: TestInstance[];

  constructor(private testService: TestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.testService.getUncheckedTests().subscribe( result => {
      this.tests = JSON.parse(JSON.stringify(result.body));
    });
  }

}
