import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ShowAllTestService } from 'src/app/services/show-all-test.service';
import { Test } from '../../model/test';
import { map } from 'rxjs/internal/operators/map';

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

    tests: Test[] = [];
    selectedTest : Test;
    
    public onSelectTest(test: Test): void {
        this.selectedTest = test;
    }

    testUrl: string = "https://luznpx1mg3.execute-api.us-east-1.amazonaws.com/Test/tests";
    test: Test;
    public getAllTests(): void{
        this.httpClient.get<Test[]>(this.testUrl, httpOptions)
        .pipe(
            map(response => { 
                this.tests = <Test[]> response;
            })
        )
        .subscribe(data => {console.log(data)});
        // .subscribe((res : Response) => this.tests = <Test[]> JSON.parse(res.body.));
    }

    public deleteTest(): void{
        // this.httpClient.get(this.deleteTestUrl, httpOptions)
        // .map((res : Response) => res.json);
        // .subscribe((res : Response)=>{
        //     console.log(res);
        //     this.tests = JSON.parse(res.json., Test[].class);
        // });
    }
}
