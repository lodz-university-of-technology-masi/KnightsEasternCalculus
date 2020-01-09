import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Globals from '../app-consts';
import * as saveAs from 'file-saver';
import { OpenQuestion } from '../model/open-question';
import { CloseQuestion } from '../model/close-question';
import { TestInstance, TestStatus } from '../model/test-instance';
import { Observable, of } from 'rxjs';
import { SolvableOpenQuestion } from '../model/solvable-open-question';
import { SolvableCloseQuestion } from '../model/solvable-close-question';
import { map } from 'rxjs/operators';
import axios from "axios";
import { KeyValue } from '@angular/common';

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
  ) {
  }

  private testUrl: string = Globals.apiBaseUrl + '/recruiters/tests';
  yandexKey: string = 'trnsl.1.1.20200108T191910Z.fe657624420b3a8c.9b1c3b15e8688d96a425d4596dfc2c6321f04ee2';


  public createTest(inputTestTitle, author, language, openQuestions, closeQuestions) {
    var test = new Test('', inputTestTitle, author, language, openQuestions, closeQuestions);
    return this.httpClient.post<Test>(this.testUrl, test, httpOptions);
  }

  public updateTest(id, inputTestTitle, author, language, openQuestions, closeQuestions) {
    var test = new Test(id, inputTestTitle, author, language, openQuestions, closeQuestions);
    return this.httpClient.patch(this.testUrl, test, httpOptions);
  }

  //  https://translate.yandex.net/api/v1.5/tr.json/translate
  //  ? key=<API key>
  //  & text=<text to translate>
  //  & lang=<translation direction>
  public async translateTest(test: Test, language: string) {
    const response = await axios.post('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + this.yandexKey + '&text=int i[] = new int[10];;&lang=pl-en');
    console.log(response.data.text[0]);
  }

  public detectLanguage(txt: string) {

  }

  public downloadTest(test: Test): void {
    var csv = '';
    csv += 'T' + ';' + btoa(unescape(encodeURIComponent(test.title))) + '\n';
    csv += 'A' + ';' + btoa(unescape(encodeURIComponent(test.author))) + '\n';
    csv += 'L' + ';' + btoa(unescape(encodeURIComponent(test.language))) + '\n';

    csv += 'type;question;correctAnswers;incorrectAnswers;answerScore' + '\n';

    test.closeQuestions.forEach(function (value) {
      csv += 'C' + ';' + btoa(unescape(encodeURIComponent(value.question))) + ';';
      csv += btoa(unescape(encodeURIComponent(value.correctAnswers.toString()))) + ';';
      csv += btoa(unescape(encodeURIComponent(value.incorrectAnswers.toString()))) + ';';
      csv += btoa(unescape(encodeURIComponent(value.answerScore.toString())));
      csv += '\n';
    });

    csv += 'type;question;correctAnswer;maxScore' + '\n';

    test.openQuestions.forEach(function (value) {
      csv += 'O' + ';' + btoa(unescape(encodeURIComponent(value.question))) + ';';
      csv += btoa(unescape(encodeURIComponent(value.correctAnswer))) + ';';
      csv += btoa(unescape(encodeURIComponent(value.maxScore.toString())));
      csv += '\n';
    });

    console.log(csv);

    let file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(file, test.title + '-' + test.id + '.csv');
  }

  public importTest(file: string) {
    var splitFile = file.split('\n');

    var title: string, author: string, language: string, openQuestions: OpenQuestion[] = [], closeQuestions: CloseQuestion[] = [];

    splitFile.forEach(function (value) {
      if (value.split(';')[0] == 'T') {
        title = atob(unescape(encodeURIComponent(value.split(';')[1])));
      } else if (value.split(';')[0] == 'A') {
        author = atob(unescape(encodeURIComponent(value.split(';')[1])));
      } else if (value.split(';')[0] == 'L') {
        language = atob(unescape(encodeURIComponent(value.split(';')[1])));
        console.log(value.split(';')[0]);
      } else if (value.split(';')[0] == 'O') {
        var splitValue = value.split(';');
        // question: string, correctAnswer: string, maxScore: number
        openQuestions.push(new OpenQuestion(atob(unescape(encodeURIComponent(splitValue[1]))), atob(unescape(encodeURIComponent(splitValue[2]))), parseInt(atob(unescape(encodeURIComponent(splitValue[3]))))));
      } else if (value.split(';')[0] == 'C') {
        var splitValue = value.split(';');
        // question: string, correctAnswers: string[], incorrectAnswers: string[], maxScore: number
        closeQuestions.push(new CloseQuestion(atob(unescape(encodeURIComponent(splitValue[1]))), atob(unescape(encodeURIComponent(splitValue[2]))).split(','), atob(unescape(encodeURIComponent(splitValue[3]))).split(','), parseInt(atob(unescape(encodeURIComponent(splitValue[4]))))));
      }
    });

    var test = new Test('', title, author, language, openQuestions, closeQuestions);
    return this.httpClient.post<Test>(this.testUrl, test, httpOptions);
    // this.createTest(title, openQuestions, closeQuestions);
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

  public getAllUserTests(username: string) {
    return of([new TestInstance('2', 2, 'Computer Systems Comprehension I', TestStatus.NotSolved, [], [], 100, 0),
    new TestInstance('3', 1, 'Am I an idiot? Find the type of bread you are.', TestStatus.NotSolved,
      [new SolvableOpenQuestion('What is a v table?', '', 10, 0, ''),
      new SolvableOpenQuestion('Write a basic while loop that stops when the incremented variable is divisible by 14. Consider the variable (i of type int) initialized with random value.', '', 20, 15, '')],
      [new SolvableCloseQuestion('Choose the correct array declaration method.', ['int i[];', 'int[5] i;', 'int i[] = new int[10];'], [], 20, 0, []),
      new SolvableCloseQuestion('What does this pointer point to? int (*fpa())[]', ['an array of functions returning int pointers', 'an array of pointers to functions returning an int', 'a function returning an array of int pointers'], [], 10, 0, [])],
      60, 15),
    new TestInstance('3', 0, 'C++ basic knowledge', TestStatus.Checked,
      [new SolvableOpenQuestion('What is a v table?', 'I don\'t know, sorry', 10, 0, 'A lookup table of functions used to resolve virtual function calls'),
      new SolvableOpenQuestion('Write a basic while loop that stops when the incremented variable is divisible by 14. Consider the variable (i of type int) initialized with random value.', 'while(i % 14 != 0) {i+= 1;}', 20, 15, 'while(i++%14 != 0);')],
      [new SolvableCloseQuestion('Choose the correct array declaration method.', ['int i[5];', 'int i[2] = {1};', 'int i[];', 'int[5] i;', 'int i[] = new int[10];'], [0, 1], 20, 0, [1, 3]),
      new SolvableCloseQuestion('What does this pointer point to? int (*fpa())[]', ['an array of functions returning int pointers', 'an array of pointers to functions returning an int', 'a function returning a pointer to an array of ints', 'a function returning an array of int pointers'], [2], 10, 0, [1])],
      60, 15)]);
  }

  public getTestInstances(id: string) {
    return this.httpClient.get(Globals.apiBaseUrl + '/applicants/' + id + '/tests');
  }

  public getTestInstance(id: string, timestamp: string) {
    return this.httpClient.get(Globals.apiBaseUrl + '/applicants/' + id + '/tests/' + timestamp);
  }

  public getUserTest(username: string, timestamp: number) {
    return this.getAllUserTests(username).pipe(map(tests => tests.find(test => test.timestamp === timestamp)));
  }

  public deleteTest(test: Test) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: test
    };

    return this.httpClient.delete(this.testUrl, httpOptions);
  }

  public sendSolvedTest(test: TestInstance) {
    return new Observable(observer => {
      this.httpClient.patch<TestInstance>(Globals.apiBaseUrl + '/applicants/' + test.applicantID + '/tests', test, httpOptions)
        .subscribe({
          error: err => {
            console.log(err);
            observer.error(err);
          },
          next: value => {
            observer.next(1);
            observer.complete();
          }
        });
    });
  }
}
