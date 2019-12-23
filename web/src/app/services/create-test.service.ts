import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloseQuestion } from '../model/close-question';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class CreateTestService {
  constructor(
    private httpClient: HttpClient
  ) { }

  addTestUrl: string = "https://luznpx1mg3.execute-api.us-east-1.amazonaws.com/Test/tests";
  public createTest(inputTestTitle, openQuestions, closeQuestions): void {
    var test = new Test(inputTestTitle, openQuestions, closeQuestions);
    this.httpClient.post<Test>(this.addTestUrl, test, httpOptions).subscribe({
      error: error => ({}),
      complete: () => { }
    });
  }
}
