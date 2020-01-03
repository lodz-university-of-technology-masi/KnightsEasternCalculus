import {Injectable} from '@angular/core';
import {Test} from '../model/test';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Globals from '../app-consts';
import * as saveAs from 'file-saver';
import {OpenQuestion} from '../model/open-question';
import {CloseQuestion} from '../model/close-question';
import {SolvableTest, TestStatus} from '../model/solvable-test';
import {of} from 'rxjs';
import {SolvedOpenQuestion} from '../model/solved-open-question';
import {SolvedCloseQuestion} from '../model/solved-close-question';

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
    return of([new SolvableTest('2', '1', 'Computer Systems Comprehension I', TestStatus.NotSolved, [], [], 100, 0),
      new SolvableTest('2', '1', 'Am I an idiot? Find the type of bread you are.', TestStatus.Solved,
        [new SolvedOpenQuestion('What is a v table?', 'A lookup table of functions used to resolve virtual function calls', 'I don\'t know, sorry', 10, 0),
          new SolvedOpenQuestion('Write a basic while loop that stops when the incremented variable is divisible by 14. Consider the variable (i of type int) initialized with random value.', 'while(i++%14 != 0);', 'while(i % 14 != 0) {i+= 1;}', 20, 15)],
        [new SolvedCloseQuestion('Choose the correct array declaration method.', ['int i[5];', 'int i[2] = {1};'], ['int i[];', 'int[5] i;', 'int i[] = new int[10];'], [1, 3], 20, 0),
          new SolvedCloseQuestion('What does this pointer point to? int (*fpa())[]', new Array('a function returning a pointer to an array of ints'), ['an array of functions returning int pointers', 'an array of pointers to functions returning an int', 'a function returning an array of int pointers'], new Array(2), 10, 0)],
        60, 15),
      new SolvableTest('3', '0', 'C++ basic knowledge', TestStatus.Checked,
        [new SolvedOpenQuestion('What is a v table?', 'A lookup table of functions used to resolve virtual function calls', 'I don\'t know, sorry', 10, 0),
          new SolvedOpenQuestion('Write a basic while loop that stops when the incremented variable is divisible by 14. Consider the variable (i of type int) initialized with random value.', 'while(i++%14 != 0);', 'while(i % 14 != 0) {i+= 1;}', 20, 15)],
        [new SolvedCloseQuestion('Choose the correct array declaration method.', ['int i[5];', 'int i[2] = {1};'], ['int i[];', 'int[5] i;', 'int i[] = new int[10];'], [1, 3], 20, 0),
          new SolvedCloseQuestion('What does this pointer point to? int (*fpa())[]', new Array('a function returning a pointer to an array of ints'), ['an array of functions returning int pointers', 'an array of pointers to functions returning an int', 'a function returning an array of int pointers'], new Array(2), 10, 0)],
        60, 15)]);
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
