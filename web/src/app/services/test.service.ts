import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Globals from '../app-consts';
import * as saveAs from 'file-saver';
import { stringify } from 'querystring';
import { OpenQuestion } from '../model/open-question';
import { CloseQuestion } from '../model/close-question';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class TestService {
  constructor(
    private httpClient: HttpClient
  ) { }

  private testUrl: string = Globals.apiTestUrl;

  public createTest(inputTestTitle, openQuestions, closeQuestions): void {
    var test = new Test("", inputTestTitle, openQuestions, closeQuestions);
    this.httpClient.post<Test>(this.testUrl, test, httpOptions).subscribe({
      error: error => ({}),
      complete: () => { }
    });
  }

  public updateTest(id, inputTestTitle, openQuestions, closeQuestions): void {
    var test = new Test(id, inputTestTitle, openQuestions, closeQuestions);
    this.httpClient.patch(this.testUrl, test, httpOptions).subscribe({
      error: error => ({}),
      complete: () => { }
    });
  }

  public downloadTest(test): void {
    var csv = "";
    csv += "T" + ";" + test.title + "\n";

    csv += "type;question;correctAnswers;incorrectAnswers;maxScore" + "\n";

    test.closeQuestions.forEach(function (value) {
      csv += "C" + ";" + value.question + ";";
      csv += value.correctAnswers + ";";
      csv += value.incorrectAnswers + ";";
      csv += value.maxScore;
      csv += "\n";
    });

    csv += "type;question;correctAnswer;maxScore" + "\n";

    test.openQuestions.forEach(function (value) {
      csv += "O" + ";" + value.question + ";";
      csv += value.correctAnswer + ";";
      csv += value.maxScore;
      csv += "\n";
    });

    console.log(csv);

    let file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(file, test.title + "-" + test.id + '.csv')
  }

  public importTest(file: string): void {
    var splitFile = file.split("\n");

    var title: string, openQuestions: OpenQuestion[] = [], closeQuestions: CloseQuestion[] = [];

    splitFile.forEach(function (value) {
      if (value.split(";")[0] == "T") {
        title = value.split(";")[1];
      }
      else if (value.split(";")[0] == "O") {
        var splitValue = value.split(";");
        // question: string, correctAnswer: string, maxScore: number
        openQuestions.push(new OpenQuestion(splitValue[1], splitValue[2], parseInt(splitValue[3])));
      }
      else if (value.split(";")[0] == "C") {
        var splitValue = value.split(";");
        // question: string, correctAnswers: string[], incorrectAnswers: string[], maxScore: number
        closeQuestions.push(new CloseQuestion(splitValue[1], splitValue[2].split(","), splitValue[3].split(","), parseInt(splitValue[4])))
      }
    })
    this.createTest(title, openQuestions, closeQuestions);
  }

  public getTest(id: string) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(this.testUrl + `/${id}`, httpOptions);
  }

  public getAllTests() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(this.testUrl, httpOptions);
  }

  public deleteTest(test: Test): void {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: test
    };

    this.httpClient.delete(this.testUrl, httpOptions)
      .subscribe((res: Response) =>
        console.log(res.body));
  }
}
