import { Component, OnInit, Injectable } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import * as json2csv from 'json2csv';
import * as saveAs from 'file-saver';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from 'querystring';
import { checkServerIdentity } from 'tls';

@Component({
    selector: 'show-all-tests',
    templateUrl: 'show-all-tests.component.html',
    styleUrls: ['show-all-tests.component.scss']
})

@Injectable()
export class ShowAllTestsComponent implements OnInit {
    test: Test;

    constructor(
        private testService: TestService,
    ) { }

    ngOnInit(): void {
        this.getAllTests();
    }

    tests: Test[];
    fileName: string;

    // selectedTest : Test;
    // public onSelectTest(test: Test): void {
    //     this.selectedTest = test;
    // }

    // public getAllTests(): void {
    //     this.tests = this.testService.getAllTests();
    // }

    public downloadTest(id: string): void {
        this.testService.getTest(id)
            .subscribe((res: Response) => {
                console.log(res.body);
                this.testService.downloadTest(<Test>JSON.parse(JSON.stringify(res.body)));
            });

    }

    fileContent: string = '';

    public loadTest(fileList: FileList): void {
        let file = fileList[0];
        let fileReader: FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = <string>fileReader.result;
        }
        fileReader.readAsText(file);
    }

    public importTest(): void {
        if (this.fileContent != "")
            this.testService.importTest(this.fileContent).subscribe({
                error: error => ({}),
                complete: () => {
                    this.getAllTests();
                }
            });
    }

    public getTest(id: string): void {
        this.testService.getTest(id)
            .subscribe((res: Response) => {
                this.test = <Test>JSON.parse(JSON.stringify(res.body));
                console.log(res.body);
            });
    }

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
}
