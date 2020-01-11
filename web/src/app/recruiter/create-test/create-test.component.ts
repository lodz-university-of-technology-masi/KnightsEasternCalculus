import { Component, OnInit, Injectable } from '@angular/core';
import { CloseQuestion } from '../../model/close-question';
import { OpenQuestion } from '../../model/open-question';
import { ValueQuestion } from '../../model/value-question';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { AuthenticationRecruiterService } from '../../services/authentication-recruiter.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})

@Injectable()
export class CreateTestComponent implements OnInit {

  constructor(

    private testService: TestService,
    private router: Router,
    private authService: AuthenticationRecruiterService
  ) { }

  currentLanguage: string = "PL";
  inputMaxScore: number;

  //#region "Init and choices beetween open and close question"
  public questionType: number;

  ngOnInit() {
    this.questionType = 0;
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
  closeQuestions: CloseQuestion[] = [];
  inputCloseQuestion: string;
  correctCloseAnswers: string[] = [];
  incorrectCloseAnswers: string[] = [];
  inputCorrectCloseAnswer: string;
  inputIncorrectCloseAnswer: string;
  selectedCloseQuestion: CloseQuestion;

  addCorrectCloseAnswer(): void {
    this.correctCloseAnswers.push(this.inputCorrectCloseAnswer);
    this.inputCorrectCloseAnswer = "";
  }

  addIncorrectCloseAnswer(): void {
    this.incorrectCloseAnswers.push(this.inputIncorrectCloseAnswer);
    this.inputIncorrectCloseAnswer = "";
  }

  addCloseQuestion(): void {
    this.closeQuestions.push(new CloseQuestion(this.inputCloseQuestion, this.correctCloseAnswers, this.incorrectCloseAnswers, this.inputMaxScore))
    this.inputMaxScore = 1;
  }

  onSelectCloseQuestion(closeQuestion: CloseQuestion): void {
    this.selectedCloseQuestion = closeQuestion;
  }

  removeCloseQuestion(closeQuestion: CloseQuestion): void {
    this.closeQuestions.splice(this.closeQuestions.indexOf(closeQuestion), 1);
  }
  //#endregion

  //#region "Open Question"
  openQuestions: OpenQuestion[] = [];
  inputOpenQuestion: string;
  inputCorrectOpenAnswer: string;
  selectedOpenQuestion: OpenQuestion;

  addOpenQuestion(): void {
    this.openQuestions.push(new OpenQuestion(this.inputOpenQuestion, this.inputCorrectOpenAnswer, this.inputMaxScore))
    this.inputMaxScore = 1;
  }

  onSelectOpenQuestion(openQuestion: OpenQuestion): void {
    this.selectedOpenQuestion = openQuestion;
  }

  removeOpenQuestion(openQuestion: OpenQuestion): void {
    this.openQuestions.splice(this.openQuestions.indexOf(openQuestion), 1);
  }
  //#endregion

  //#region "Value Question"
  valueQuestions: ValueQuestion[] = [];
  inputValueQuestion: string;
  inputCorrectValueAnswer;
  selectedValueQuestion: ValueQuestion;


  addValueQuestion(): void {
    this.valueQuestions.push(new ValueQuestion(this.inputValueQuestion, this.inputCorrectValueAnswer, this.inputMaxScore))
    this.inputMaxScore = 1;
  }

  onSelectValueQuestion(valueQuestion: ValueQuestion): void {
    this.selectedValueQuestion = valueQuestion;
  }

  removeValueQuestion(valueQuestion: ValueQuestion): void {
    this.valueQuestions.splice(this.valueQuestions.indexOf(valueQuestion), 1);
  }
  //#endregion

  //#region "Create Test"
  inputTestTitle: string = "";
  public createTest(): void {
    this.testService.createTest(this.inputTestTitle, this.currentLanguage, this.authService.getUsername(), this.openQuestions, this.closeQuestions, this.valueQuestions).subscribe({
      error: error => ({}),
      complete: () => {
        this.router.navigate(['/recruiter/show-all-tests']);
      }
    });
  }
  //#endregion
}
