import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Globals from '../app-consts';

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
