import { Component, OnInit } from '@angular/core';
import {TestInstance} from '../../model/test-instance';
import {ActivatedRoute} from '@angular/router';
import {TestService} from '../../services/test.service';

@Component({
  selector: 'app-grade-test',
  templateUrl: './grade-test.component.html',
  styleUrls: ['./grade-test.component.scss']
})
export class GradeTestComponent implements OnInit {

  private test: TestInstance;
  private applicantID;
  private timestamp;

  constructor(private route: ActivatedRoute, private testService: TestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( value => {
      this.applicantID = value.get('id');
      this.timestamp = value.get('timestamp');

      this.testService.getTestInstance(this.applicantID, this.timestamp).subscribe( (result: Response) => {
        this.test = JSON.parse(JSON.stringify(result.body)) as TestInstance;
      });
    });
  }

  grade() {
    this.testService.sendSolvedTest(this.test).subscribe( result => {
      console.log(result);
    });
  }

}
