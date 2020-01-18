import { Component, OnInit, Injectable } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from '../../model/test';
import { ApplicantService } from '../../services/applicant.service';
import { Applicant } from '../../model/applicant';
import { AssignModalComponent } from '../../common-components/assign-modal/assign-modal.component';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationRecruiterService } from '../../services/authentication-recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
        private modalService: NgbModal,
        private authService: AuthenticationRecruiterService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getAllTests();
    }

    public getUser() {
        return this.authService.getUser().getUsername();
    }

    public async translateTest(testToTranslate: Test) {
        console.log(testToTranslate);
        (await this.testService.translateTest(testToTranslate)
            .subscribe(
                res => {
                    console.log(res);
                    var test = <Test>JSON.parse(JSON.stringify(res));
                    this.testService.createTest(test.title, test.language, test.openQuestions, test.closeQuestions, test.valueQuestions).subscribe(
                        res2 => {
                            console.log(res2);
                            this.router.navigate(['/recruiter/show-all-tests/update-test', res2.testId]);

                        },
                        (error: HttpErrorResponse) => {
                            console.log(error);
                        }
                    )
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                }));
    }

    public downloadTest(id: number): void {
        this.testService.getTest(id)
            .subscribe(
                res => {
                    console.log(res);
                    this.testService.downloadTest(<Test>JSON.parse(JSON.stringify(res)));
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                }
            );
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
        if (this.fileContent != "") {
            try{
                this.testService.importTest(this.fileContent);
                this.router.navigate(['/recruiter/import-test']);
            }
            catch(error){
                // console.log("ERROR: import failed");
                console.log(error);
            }
        }
    }

    public getTest(id: number): void {
        this.testService.getTest(id)
            .subscribe((res: Response) => {
                this.test = <Test>JSON.parse(JSON.stringify(res));
                console.log(res);
            });
    }

    public getAllTests(): void {
        this.testService.getAllTests()
            .subscribe(
                res => {
                    this.tests = JSON.parse(JSON.stringify(res));
                }
            );
    }

    public deleteTest(test: Test): void {
        this.testService.deleteTest(test.testId)
            .subscribe({
                error: () => {
                    console.log("Delete failed");
                },
                complete: () => {
                    this.getAllTests();
                }
            });
    }

    toggleAssign(popover, id: number, title: string) {
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
