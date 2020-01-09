import { Component, OnInit, Injectable } from '@angular/core';
import { CloseQuestion } from '../../model/close-question';
import { OpenQuestion } from '../../model/open-question';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { AuthenticationRecruiterService } from '../../services/authentication-recruiter.service';

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
  inputTestTitle: string = "";
  inputLanguage: string = "pl";
  public createTest(): void {
    this.testService.createTest(this.inputTestTitle, this.inputLanguage, this.authService.getUsername(), this.openQuestions, this.closeQuestions).subscribe({
      error: error => ({}),
      complete: () => {
        this.router.navigate(['/recruiter/show-all-tests']);
      }
    });
  }
  //#endregion
}
