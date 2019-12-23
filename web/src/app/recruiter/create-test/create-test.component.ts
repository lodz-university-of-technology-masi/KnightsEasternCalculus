import { Component, OnInit, Injectable } from '@angular/core';
import { CloseQuestion } from '../../model/close-question';
import { OpenQuestion } from '../../model/open-question';
import { CreateTestService } from '../../services/create-test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})

@Injectable()
export class CreateTestComponent implements OnInit {

  constructor(
    private createTestService: CreateTestService
  ) { }


  //#region "Init and choices beetween open and close question"
  ifOpen: boolean;
  ifClose: boolean;

  ngOnInit() {
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
    this.inputCorrectCloseAnswer = null;
  }

  addIncorrectCloseAnswer(): void {
    this.incorrectCloseAnswers.push(this.inputIncorrectCloseAnswer);
    this.inputIncorrectCloseAnswer = null;
  }

  addCloseQuestion(): void {
    if (this.correctCloseAnswers.length != 0) {
      this.closeQuestions.push(new CloseQuestion(this.inputCloseQuestion, this.correctCloseAnswers, this.incorrectCloseAnswers, this.inputMaxScoreClose));
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
    this.closeQuestions.splice(this.closeQuestions.indexOf(closeQuestion), 1);
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
    this.inputOpenQuestion = null;
    this.inputCorrectOpenAnswer = null;
    this.inputMaxScoreOpen = 1;
  }

  removeOpenQuestion(openQuestion: OpenQuestion): void {
    this.openQuestions.splice(this.openQuestions.indexOf(openQuestion), 1);
  }

  onSelectOpenQuestion(openQuestion: OpenQuestion): void {
    this.selectedOpenQuestion = openQuestion;
  }
  //#endregion

  //#region "Create Test"
  inputTestTitle: string = "";
  public createTest(): void {
    this.createTestService.createTest(this.inputTestTitle, this.openQuestions, this.closeQuestions);
  }
  //#endregion
}
