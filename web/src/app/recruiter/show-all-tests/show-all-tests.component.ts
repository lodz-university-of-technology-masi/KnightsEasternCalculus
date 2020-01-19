import {Component, OnInit, Injectable} from '@angular/core';
import {TestService} from 'src/app/services/test.service';
import {Test} from '../../model/test';
import {ApplicantService} from '../../services/applicant.service';
import {Applicant} from '../../model/applicant';
import {AssignModalComponent} from '../../common-components/assign-modal/assign-modal.component';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationRecruiterService} from '../../services/authentication-recruiter.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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
  fileContent = '';
  deleteTestId: number;
  deleteInProgress = false;

  constructor(
    private testService: TestService,
    private applicantService: ApplicantService,
    private modalService: NgbModal,
    private authService: AuthenticationRecruiterService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllTests();
  }

  public getUser() {
    return this.authService.getUser().getUsername();
  }

  open(content, testTimestamp) {
    this.deleteTestId = testTimestamp;
    this.modalService.open(content);
  }

  public async translateTest(content, testToTranslate: Test) {
    this.modalService.open(content);
    (await this.testService.translateTest(testToTranslate)
      .subscribe(
        res => {
          console.log(res);
          const test = JSON.parse(JSON.stringify(res)) as Test;
          this.testService.createTest(test.title, test.language, test.openQuestions, test.closeQuestions, test.valueQuestions).subscribe(
            res2 => {
              this.modalService.dismissAll();
              this.router.navigate(['/recruiter/show-all-tests/update-test', res2.testId]);

            },
            (error: HttpErrorResponse) => {
              this.modalService.dismissAll();
              console.log(error);
            }
          );
        },
        (error: HttpErrorResponse) => {
          this.modalService.dismissAll();
          console.log(error);
        }));
  }

  public downloadTest(content, id: number): void {
    this.modalService.open(content);
    this.testService.getTest(id)
      .subscribe(
        res => {
          this.testService.downloadTest(JSON.parse(JSON.stringify(res)) as Test);
          this.modalService.dismissAll();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.modalService.dismissAll();
        }
      );
  }

  public loadTest(fileList: FileList): void {
    const file = fileList[0];
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result as string;
    };
    fileReader.readAsText(file);
  }

  public importTest(): void {
    if (this.fileContent != '') {
      try {
        this.testService.importTest(this.fileContent);
        this.router.navigate(['/recruiter/import-test']);
      } catch (error) {
        // console.log("ERROR: import failed");
        console.log(error);
      }
    }
  }

  public getTest(id: number): void {
    this.testService.getTest(id)
      .subscribe(res => {
        this.test = res.body as Test;
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

  public deleteTest(): void {
    this.deleteInProgress = true;
    this.testService.deleteTest(this.deleteTestId)
      .subscribe({
        error: err => {
          this.deleteInProgress = false;
          console.log(err);
        },
        complete: () => {
          this.deleteInProgress = false;
          this.modalService.dismissAll();
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
      popover.open({id, title});
    }
  }

  searchApplicants(): void {
    this.applicantLoading = true;
    this.applicants = null;
    this.applicantService.getApplicants(this.searchLastName)
      .subscribe(applicants => {
        this.applicants = applicants;
        this.applicantLoading = false;
      });
  }

  openAssignModal(testId: string, testName: string, applicantId: string, applicantFirstName: string, applicantLastName: string) {
    this.popover.close();
    const modalRef = this.modalService.open(AssignModalComponent, {centered: true});
    modalRef.componentInstance.testId = testId;
    modalRef.componentInstance.testName = testName;
    modalRef.componentInstance.applicantId = applicantId;
    modalRef.componentInstance.applicantFirstName = applicantFirstName;
    modalRef.componentInstance.applicantLastName = applicantLastName;
  }
}
