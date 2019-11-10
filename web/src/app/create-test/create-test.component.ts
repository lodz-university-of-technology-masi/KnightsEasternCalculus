import { Component, OnInit } from '@angular/core';
import { CloseQuestion } from '../close-question';
import { OpenQuestion } from '../open-question';
import { CreateTestService } from '../create-test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  constructor(
    private createTestService: CreateTestService
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
    createTest(): void {
      // this.createTestService.
      
      //   this.createTestService.getCloseQuestions().subscribe(closeQuestions => this.closeQuestions = closeQuestions);
      //   this.createTestService.getOpenQuestions().subscribe(openQuestions => this.openQuestions = openQuestions);
    }
  //#endregion
}
