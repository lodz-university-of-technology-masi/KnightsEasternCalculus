import { Component, OnInit, Injectable } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';

@Component({
    selector: 'show-all-tests',
    templateUrl: 'show-all-tests.component.html',
    styleUrls: ['show-all-tests.component.scss']
})

@Injectable()
export class ShowAllTestsComponent implements OnInit {

    constructor(
        private testService: TestService,
    ) { }

    ngOnInit(): void {
        this.getAllTests();
    }

    tests: Test[];

    // selectedTest : Test;
    // public onSelectTest(test: Test): void {
    //     this.selectedTest = test;
    // }

    // public getAllTests(): void {
    //     this.tests = this.testService.getAllTests();
    // }

    public getAllTests(): void {
        this.testService.getAllTests()
            .subscribe((res: Response) => {
                console.log(res.body);
                this.tests = <Test[]>JSON.parse(JSON.stringify(res.body));
            });
    }

    public deleteTest(test: Test): void {
        this.testService.deleteTest(test);
        this.getAllTests();
    }

    public updateTest(test: Test): void {

    }
}
