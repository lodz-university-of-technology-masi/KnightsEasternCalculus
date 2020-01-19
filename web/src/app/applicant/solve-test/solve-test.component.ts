import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../../services/test.service';
import {TestInstance} from '../../model/test-instance';


@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.scss']
})

export class SolveTestComponent implements OnInit {

  test: TestInstance;

  constructor(private route: ActivatedRoute, private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( value => {
      const split = value.get('id').split('=');
      const appID = split[0];
      const timestamp = split[1];
      this.testService.getTestInstance(appID, timestamp).subscribe( result => {
        this.test = JSON.parse(JSON.stringify(result.body));
        this.test.valueQuestions.forEach(question => question.answer = 0);
      });
    });
  }

  send() {
    let element: HTMLInputElement;
    for (let i = 0; i < this.test.closeQuestions.length; i++) {
      for (let j = 0; j < this.test.closeQuestions[i].answers.length; j++) {
        element = document.getElementById(`${j},${i}`) as HTMLInputElement;
        if (element.checked) {
          this.test.closeQuestions[i].chosenAnswers.push(j);
        }
      }
    }
    this.test.receivedScore = 0;

    this.test.openQuestions.forEach( q => {
      if (!q.answer) {
        q.answer = '';
      }
    });

    this.test.closeQuestions.forEach( q => {
      if (!q.chosenAnswers) {
        q.chosenAnswers = [];
      }
    });

    this.test.valueQuestions.forEach( q => {
      if (!q.answer) {
        q.answer = 0;
      }
    });

    this.testService.sendSolvedTest(this.test).subscribe( result => {
      if (result) {
        this.router.navigateByUrl('applicant/tests');
      }
    });
  }


}
