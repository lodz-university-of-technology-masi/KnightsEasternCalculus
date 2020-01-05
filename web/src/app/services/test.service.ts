import {Injectable} from '@angular/core';
import {Test} from '../model/test';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Globals from '../app-consts';
import * as saveAs from 'file-saver';
import {OpenQuestion} from '../model/open-question';
import {CloseQuestion} from '../model/close-question';
import {TestInstance, TestStatus} from '../model/test-instance';
import {Observable, of} from 'rxjs';
import {SolvableOpenQuestion} from '../model/solvable-open-question';
import {SolvableCloseQuestion} from '../model/solvable-close-question';
import {map} from 'rxjs/operators';

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

  private testUrl: string = Globals.apiTestUrl;

  public createTest(inputTestTitle, openQuestions, closeQuestions): void {
    var test = new Test('', inputTestTitle, openQuestions, closeQuestions);
    this.httpClient.post<Test>(this.testUrl, test, httpOptions).subscribe({
      error: error => ({}),
      complete: () => {
      }
    });
  }

  public updateTest(id, inputTestTitle, openQuestions, closeQuestions): void {
    var test = new Test(id, inputTestTitle, openQuestions, closeQuestions);
    this.httpClient.patch(this.testUrl, test, httpOptions).subscribe({
      error: error => ({}),
      complete: () => {
      }
    });
  }

  public downloadTest(test): void {
    var csv = '';
    csv += 'T' + ';' + test.title + '\n';

    csv += 'type;question;correctAnswers;incorrectAnswers;maxScore' + '\n';

    test.closeQuestions.forEach(function(value) {
      csv += 'C' + ';' + value.question + ';';
      csv += value.correctAnswers + ';';
      csv += value.incorrectAnswers + ';';
      csv += value.maxScore;
      csv += '\n';
    });

    csv += 'type;question;correctAnswer;maxScore' + '\n';

    test.openQuestions.forEach(function(value) {
      csv += 'O' + ';' + value.question + ';';
      csv += value.correctAnswer + ';';
      csv += value.maxScore;
      csv += '\n';
    });

    console.log(csv);

    let file = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    saveAs(file, test.title + '-' + test.id + '.csv');
  }

  public importTest(file: string) {
    var splitFile = file.split('\n');

    var title: string, openQuestions: OpenQuestion[] = [], closeQuestions: CloseQuestion[] = [];

    splitFile.forEach(function(value) {
      if (value.split(';')[0] == 'T') {
        title = value.split(';')[1];
      } else if (value.split(';')[0] == 'O') {
        var splitValue = value.split(';');
        // question: string, correctAnswer: string, maxScore: number
        openQuestions.push(new OpenQuestion(splitValue[1], splitValue[2], parseInt(splitValue[3])));
      } else if (value.split(';')[0] == 'C') {
        var splitValue = value.split(';');
        // question: string, correctAnswers: string[], incorrectAnswers: string[], maxScore: number
        closeQuestions.push(new CloseQuestion(splitValue[1], splitValue[2].split(','), splitValue[3].split(','), parseInt(splitValue[4])));
      }
    });

    var test = new Test('', title, openQuestions, closeQuestions);
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
        [new SolvableCloseQuestion('Choose the correct array declaration method.', ['int i[];', 'int[5] i;', 'int i[] = new int[10];'],  [], 20, 0, []),
          new SolvableCloseQuestion('What does this pointer point to? int (*fpa())[]', ['an array of functions returning int pointers', 'an array of pointers to functions returning an int', 'a function returning an array of int pointers'],  [], 10, 0, [])],
        60, 15),
      new TestInstance('3', 1, 'C++ basic knowledge', TestStatus.Checked,
        [new SolvableOpenQuestion('What is a v table?', '', 10, 0, ''),
          new SolvableOpenQuestion('Write a basic while loop that stops when the incremented variable is divisible by 14. Consider the variable (i of type int) initialized with random value.', '', 20, 15, '')],
        [new SolvableCloseQuestion('Choose the correct array declaration method.', ['int i[5];', 'int i[2] = {1};'], [], 20, 0, []),
          new SolvableCloseQuestion('What does this pointer point to? int (*fpa())[]', ['an array of functions returning int pointers', 'an array of pointers to functions returning an int', 'a function returning an array of int pointers'], [], 10, 0, [])],
        60, 15)]);
  }

  public getUserTest(username: string, timestamp: number) {
    return this.getAllUserTests(username).pipe(map(tests => tests.find(test => test.timestamp === timestamp)));
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

  public sendSolvedTest(test: TestInstance) {
      return new Observable( observer => {
        this.httpClient.post<TestInstance>(Globals.apiSolveUrl.replace('\{ID\}', test.applicantID), test, httpOptions).subscribe( {
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
