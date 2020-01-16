import { Component, OnInit } from '@angular/core';
import {TestInstance} from '../../model/test-instance';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../../services/test.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-grade-test',
  templateUrl: './grade-test.component.html',
  styleUrls: ['./grade-test.component.scss']
})
export class GradeTestComponent implements OnInit {

  private test: TestInstance;
  private applicantID;
  private timestamp;
  private valid = true;

  constructor(private route: ActivatedRoute, private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( value => {
      this.applicantID = value.get('id');
      this.timestamp = value.get('timestamp');

      this.testService.getTestInstance(this.applicantID, this.timestamp).subscribe( result => {
        this.test = JSON.parse(JSON.stringify(result.body)) as TestInstance;
        console.log(this.test);
      });
    });
  }

  grade() {
    this.validate().subscribe( res => {
      if (res) {
        this.testService.sendGradedTest(this.test).subscribe(result => {
          if (result === 1) {
            this.router.navigateByUrl('/recruiter/applicant/' + this.applicantID);
          }
        });
      }
    });
  }

  validate() {
    return new Observable(observer => {
      this.test.openQuestions.forEach( question => {
        if (question.receivedScore < 0 || question.receivedScore > question.maxScore) {
          this.valid = false;
          observer.next(false);
          observer.complete();
        }
      });

      observer.next(true);
      observer.complete();
    });

  }

}
