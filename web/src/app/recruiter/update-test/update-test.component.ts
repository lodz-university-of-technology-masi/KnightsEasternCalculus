import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import { CloseQuestion } from 'src/app/model/close-question';
import { OpenQuestion } from 'src/app/model/open-question';
import { Router } from '@angular/router';
import { ValueQuestion } from 'src/app/model/value-question';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.scss']
})

@Injectable()
export class UpdateTestComponent implements OnInit {
  testId: number;
  test: Test;
  inputMaxScore: number;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //#region "Init and choices beetween open and close question"
  public questionType: number;

  ngOnInit() {
    this.questionType = 0;
    this.route.paramMap.subscribe(value => this.testId = parseInt(value.get('id'), 10));
    this.getTest(this.testId);
  }

  getQuestionType(): number {
    return this.questionType;
  }

  setQuestionType(type: number): void {
    this.questionType = type;
  }

  getIfOpen(): boolean {
    if (this.questionType == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getIfClose(): boolean {
    if (this.questionType == 1) {
      return true;
    }
    else {
      return false;
    }
  }

  getIfValue(): boolean {
    if (this.questionType == 2) {
      return true;
    }
    else {
      return false;
    }
  }
  //#endregion

  //#region "Close Question"
  inputCloseQuestion: string;
  correctCloseAnswers: string[] = [];
  incorrectCloseAnswers: string[] = [];
  inputCorrectCloseAnswer: string;
  inputIncorrectCloseAnswer: string;
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
      this.test.closeQuestions.push(new CloseQuestion(this.inputCloseQuestion, this.correctCloseAnswers, this.incorrectCloseAnswers, this.inputMaxScore));
      this.inputCloseQuestion = null;
      this.inputCorrectCloseAnswer = null;
      this.correctCloseAnswers = [];
      this.inputIncorrectCloseAnswer = null;
      this.incorrectCloseAnswers = [];
      this.inputMaxScore = 1;
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

  addOpenQuestion(): void {
    this.test.openQuestions.push(new OpenQuestion(this.inputOpenQuestion, this.inputCorrectOpenAnswer, this.inputMaxScore))
    this.inputOpenQuestion = null;
    this.inputCorrectOpenAnswer = null;
    this.inputMaxScore = 1;
  }

  removeOpenQuestion(openQuestion: OpenQuestion): void {
    this.test.openQuestions.splice(this.test.openQuestions.indexOf(openQuestion), 1);
  }

  onSelectOpenQuestion(openQuestion: OpenQuestion): void {
    this.selectedOpenQuestion = openQuestion;
  }
  //#endregion

  //#region "Value Question"
  valueQuestions: ValueQuestion[] = [];
  inputValueQuestion: string;
  inputCorrectValueAnswer;
  selectedValueQuestion: ValueQuestion;

  addValueQuestion(): void {
    this.test.valueQuestions.push(new ValueQuestion(this.inputValueQuestion, this.inputCorrectValueAnswer, this.inputMaxScore))
    this.inputValueQuestion = null;
    this.inputCorrectValueAnswer = null;
    this.inputMaxScore = 1;
  }

  onSelectValueQuestion(valueQuestion: ValueQuestion): void {
    this.selectedValueQuestion = valueQuestion;
  }

  removeValueQuestion(valueQuestion: ValueQuestion): void {
    this.test.valueQuestions.splice(this.valueQuestions.indexOf(valueQuestion), 1);
  }
  //#endregion

  //#region "Test Management"
  public updateTest(): void {
    this.testService.updateTest(this.test.testId, this.test.title, this.test.language, this.test.openQuestions, this.test.closeQuestions, this.test.valueQuestions).subscribe({
      error: error => ({}),
      complete: () => {
        this.router.navigate(['/recruiter/show-all-tests']);
      }
    });
  }

  getTest(id: number): void {
    this.testService.getTest(id).subscribe(
      // .subscribe((res: Response) => {
      //   console.log(res);
      //   this.test = <Test>JSON.parse(JSON.stringify(res));
      // });
      res => {
        this.test = <Test>JSON.parse(JSON.stringify(res));
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }
  //#endregion

  synonym: string = '';
  synonyms: string[] = [];

  public getSynonyms() {
    this.testService.synonymOfWord(this.synonym)
    .subscribe(
      res => {
          console.log(res);
          var syn = JSON.parse(JSON.stringify(res));
          this.synonyms = syn;
      },
      (error: HttpErrorResponse) => {
          console.log(error);
      });
  }
}
