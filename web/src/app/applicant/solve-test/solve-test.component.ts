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
        this.test = result.body as unknown as TestInstance;
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

    this.testService.sendSolvedTest(this.test).subscribe( result => {
      console.log(result);
      if (result) {
        this.router.navigateByUrl('applicant/tests');
      }
    });
  }


}
