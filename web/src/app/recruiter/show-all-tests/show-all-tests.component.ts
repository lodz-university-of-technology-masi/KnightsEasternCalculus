import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ShowAllTestService } from 'src/app/services/show-all-test.service';
import { Test } from '../../model/test';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Component({
    selector: 'show-all-tests',
    templateUrl: 'show-all-tests.component.html',
    styleUrls: ['show-all-tests.component.scss']
})

@Injectable()
export class ShowAllTestsComponent implements OnInit {

    constructor(
        private showAllTestsService: ShowAllTestService,
        private httpClient: HttpClient
    ){}

    ngOnInit(): void {
        this.getAllTests();
    }

    tests: Test[];
    selectedTest : Test;

    public onSelectTest(test: Test): void {
        this.selectedTest = test;
    }

    testUrl: string = "https://zivdvi6n2d.execute-api.us-east-1.amazonaws.com/test/recruiter/tests";
    test: Test;

    public getAllTests(): void{

        this.httpClient.get(this.testUrl, httpOptions)
        .subscribe((res: Response) => {
            console.log(res.body);
            this.tests = <Test[]> JSON.parse(JSON.stringify(res.body));
        });
    }

    public deleteTest(test : Test): void {
        var httpOptions2  = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: test};

        this.tests.splice(this.tests.indexOf(test), 1);
        this.httpClient.delete(this.testUrl, httpOptions2)
        .subscribe((res: Response) =>
            console.log(res.body));
    }

    public updateTest(test: Test): void{

    }
}
