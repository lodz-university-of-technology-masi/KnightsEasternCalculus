import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import { CloseQuestion } from 'src/app/model/close-question';
import { OpenQuestion } from 'src/app/model/open-question';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.scss']
})

@Injectable()
export class UpdateTestComponent implements OnInit {
  testId: string;
  test: Test;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute
  ) { }

  //#region "Init and choices beetween open and close question"
  ifOpen: boolean;
  ifClose: boolean;

  ngOnInit() {
    this.ifOpen = false;
    this.ifClose = true;

    this.route.paramMap.subscribe(value => this.testId = value.get('id'));
    this.getTest(this.testId);
  }

  getIfOpen(): boolean {
    return this.ifOpen;
  }

  getIfClose(): boolean {
    return this.ifClose;
  }

  selectOpenType(): void {
    this.ifClose = false;
    this.ifOpen = true;
  }

  selectCloseType(): void {
    this.ifOpen = false;
    this.ifClose = true;
  }
  //#endregion

  //#region "Close Question"
  inputCloseQuestion: string;
  correctCloseAnswers: string[] = [];
  incorrectCloseAnswers: string[] = [];
  inputCorrectCloseAnswer: string;
  inputIncorrectCloseAnswer: string;
  inputMaxScoreClose: number;
  selectedCloseQuestion: CloseQuestion;

  addCorrectCloseAnswer(): void {
    this.correctCloseAnswers.push(this.inputCorrectCloseAnswer);
    this.inputCorrectCloseAnswer = null;
  }

  addIncorrectCloseAnswer(): void {
    this.incorrectCloseAnswers.push(this.inputIncorrectCloseAnswer);
    this.inputIncorrectCloseAnswer = null;
  }

  addCloseQuestion(): void {
    if (this.correctCloseAnswers.length != 0) {
      this.test.closeQuestions.push(new CloseQuestion(this.inputCloseQuestion, this.correctCloseAnswers, this.incorrectCloseAnswers, this.inputMaxScoreClose));
      this.inputCloseQuestion = null;
      this.inputCorrectCloseAnswer = null;
      this.correctCloseAnswers = null;
      this.inputIncorrectCloseAnswer = null;
      this.incorrectCloseAnswers = null;
      this.inputMaxScoreClose = 1;
    } else {
      alert("Nie dodano pytania (brak poprawnej odpowiedzi)")
    }
  }

  removeCloseQuestion(closeQuestion: CloseQuestion): void {
    this.test.closeQuestions.splice(this.test.closeQuestions.indexOf(closeQuestion), 1);
  }

  onSelectCloseQuestion(closeQuestion: CloseQuestion): void {
    this.selectedCloseQuestion = closeQuestion;
  }
  //#endregion

  //#region "Open Question"
  inputOpenQuestion: string;
  inputCorrectOpenAnswer: string;
  selectedOpenQuestion: OpenQuestion;
  inputMaxScoreOpen; number;

  addOpenQuestion(): void {
    this.test.openQuestions.push(new OpenQuestion(this.inputOpenQuestion, this.inputCorrectOpenAnswer, this.inputMaxScoreOpen))
    this.inputOpenQuestion = null;
    this.inputCorrectOpenAnswer = null;
    this.inputMaxScoreOpen = 1;
  }

  removeOpenQuestion(openQuestion: OpenQuestion): void {
    this.test.openQuestions.splice(this.test.openQuestions.indexOf(openQuestion), 1);
  }

  onSelectOpenQuestion(openQuestion: OpenQuestion): void {
    this.selectedOpenQuestion = openQuestion;
  }
  //#endregion

  //#region "Test Management"
  public updateTest(): void {
    this.testService.updateTest(this.test.id, this.test.title, this.test.openQuestions, this.test.closeQuestions);
  }

  getTest(id: string): void {
    this.testService.getTest(this.testId)
      .subscribe((res: Response) => {
        console.log(res.body);
        this.test = <Test>JSON.parse(JSON.stringify(res.body));
      });
  }
  //#endregion
}
