import { Component, OnInit, Injectable } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import * as saveAs from 'file-saver';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from 'querystring';
import { checkServerIdentity } from 'tls';
import { ApplicantService } from '../../services/applicant.service';
import { Applicant } from '../../model/applicant';
import { AssignModalComponent } from './assign-modal/assign-modal.component';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'show-all-tests',
    templateUrl: 'show-all-tests.component.html',
    styleUrls: ['show-all-tests.component.scss'],
    styles: [`
          :host >>> .popover {
            color: #000;
            max-width: 100%;
          }
      `]
})

@Injectable()
export class ShowAllTestsComponent implements OnInit {
    test: Test;
    searchLastName: string;
    applicantLoading = false;
    applicants: Applicant[];
    tests: Test[];
    popover: NgbPopover;
    fileName: string;
    fileContent: string = '';
    selectedTest: Test;
    languages: any;
    currentLanguage: string = ""

    constructor(
        private testService: TestService,
        private applicantService: ApplicantService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getAllTests();
    }

    public onSelect(test: Test) {
        this.selectedTest = test;
        this.currentLanguage = this.selectedTest.language.toUpperCase();
    }

    public translateTest() {
        this.testService.translateTest(this.selectedTest, this.currentLanguage);
        // this.testService.translateTest(this.selectedTest, this.currentLanguage).subscribe({
        //     error: error => ({}),
        //     complete: () => { }
        // });

    }

    public downloadTest(id: string): void {
        this.testService.getTest(id)
            .subscribe((res: Response) => {
                console.log(res);
                this.testService.downloadTest(<Test>JSON.parse(JSON.stringify(res)));
            });
    }

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
                this.test = <Test>JSON.parse(JSON.stringify(res));
                console.log(res);
            });
    }

    public getAllTests(): void {
        this.testService.getAllTests()
            .subscribe(
                (res: Response) => {
                    this.tests = <Test[]>JSON.parse(JSON.stringify(res));
                }
            );
    }

    public deleteTest(test: Test): void {
        this.testService.deleteTest(test)
        .subscribe({
            error: () => {
                console.log("Delete failed");
            },
            complete: () => {
                this.getAllTests();
            }
        });
    }

    toggleAssign(popover, id: string, title: string) {
        if (popover.isOpen()) {
            popover.close();
        } else {
            this.applicantLoading = false;
            this.applicants = null;
            this.searchLastName = '';
            this.popover = popover;
            popover.open({ id, title });
        }
    }

    searchApplicants(): void {
        this.applicantLoading = true;
        this.applicants = null;
        this.applicantService.getApplicants(this.searchLastName)
            .subscribe(applicants => { this.applicants = applicants; this.applicantLoading = false; });
    }

    openAssignModal(testId: string, testName: string, applicantId: string, applicantFirstName: string, applicantLastName: string) {
        this.popover.close();
        const modalRef = this.modalService.open(AssignModalComponent, { centered: true });
        modalRef.componentInstance.testId = testId;
        modalRef.componentInstance.testName = testName;
        modalRef.componentInstance.applicantId = applicantId;
        modalRef.componentInstance.applicantFirstName = applicantFirstName;
        modalRef.componentInstance.applicantLastName = applicantLastName;
    }
}
