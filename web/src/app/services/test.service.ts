import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  private tests: Test[];

  public createTest(inputTestTitle, openQuestions, closeQuestions): void {
    var test = new Test(inputTestTitle, openQuestions, closeQuestions);
    this.httpClient.post<Test>(this.testUrl, test, httpOptions).subscribe({
      error: error => ({}),
      complete: () => { }
    });
  }

  public getAllTests(): Test[] {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.httpClient.get(this.testUrl, httpOptions)
      .subscribe((res: Response) => {
        console.log(res.body);
        this.tests = <Test[]>JSON.parse(JSON.stringify(res.body));
      });
    return this.tests;
  }

  public deleteTest(test: Test): void {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: test
    };

    this.tests.splice(this.tests.indexOf(test), 1);
    this.httpClient.delete(this.testUrl, httpOptions)
      .subscribe((res: Response) =>
        console.log(res.body));
  }
}
