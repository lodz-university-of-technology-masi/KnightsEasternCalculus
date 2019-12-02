import { Component, OnInit, Injectable } from '@angular/core';
import { CloseQuestion } from '../close-question';
import { OpenQuestion } from '../open-question';
import { CreateTestService } from '../create-test.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Test } from '../test';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})

@Injectable()
export class CreateTestComponent implements OnInit {

  constructor(
    private createTestService: CreateTestService,
    private httpClient : HttpClient
  ) { }


  //#region "Init and choices beetween open and close question"
  ifOpen: boolean;
  ifClose: boolean;
  
  ngOnInit() {
    // this.getQuestions();
    this.ifOpen = false;
    this.ifClose = true;
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
  closeQuestions: CloseQuestion[] = [];
  inputCloseQuestion: string;
  correctCloseAnswers: string[] = [];
  incorrectCloseAnswers: string[] = [];
  inputCorrectCloseAnswer: string;
  inputIncorrectCloseAnswer: string;
  inputMaxScoreClose: number;
  selectedCloseQuestion: CloseQuestion;

  addCorrectCloseAnswer(): void {
    this.correctCloseAnswers.push(this.inputCorrectCloseAnswer);
    this.inputCorrectCloseAnswer = "";
  }

  addIncorrectCloseAnswer(): void {
    this.incorrectCloseAnswers.push(this.inputIncorrectCloseAnswer);
    this.inputIncorrectCloseAnswer = "";
  }

  addCloseQuestion(): void{
    this.closeQuestions.push(new CloseQuestion(this.inputCloseQuestion, this.correctCloseAnswers, this.incorrectCloseAnswers, this.inputMaxScoreClose))
  }

  onSelectCloseQuestion(closeQuestion: CloseQuestion): void {
    this.selectedCloseQuestion = closeQuestion;
  }
  //#endregion

  //#region "Open Question"
  openQuestions: OpenQuestion[] = [];
  inputOpenQuestion: string;
  inputCorrectOpenAnswer: string;
  selectedOpenQuestion: OpenQuestion;
  inputMaxScoreOpen; number;

  addOpenQuestion(): void {
    this.openQuestions.push(new OpenQuestion(this.inputOpenQuestion, this.inputCorrectOpenAnswer, this.inputMaxScoreOpen))
  }

  onSelectOpenQuestion(openQuestion: OpenQuestion): void {
    this.selectedOpenQuestion = openQuestion;
  }
  //#endregion

  //#region "Create Test"
  addTestUrl: string = "https://luznpx1mg3.execute-api.us-east-1.amazonaws.com/Test/tests";
  test: Test;
  public createTest(): void {
    this.test = new Test(this.openQuestions, this.closeQuestions);
    this.httpClient.post<Test>(this.addTestUrl, this.test, httpOptions).subscribe({
        error: error => ({}),
        complete: () => {}
    });
  }
  //#endregion
}
