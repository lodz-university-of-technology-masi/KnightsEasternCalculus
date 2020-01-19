import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import { AuthenticationRecruiterService } from 'src/app/services/authentication-recruiter.service';
import { Router } from '@angular/router';

@Component({
    selector: 'import-test',
    templateUrl: 'import-test.component.html',
    styleUrls: ['import-test.component.scss']
})
export class ImportTestComponent implements OnInit {
    importedTest: Test;

    constructor(public testService: TestService) { }

    ngOnInit(): void {
        this.importedTest = this.testService.getImportedTest();
    }
}
