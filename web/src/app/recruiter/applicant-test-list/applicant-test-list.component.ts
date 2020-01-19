import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestInstance, TestStatus} from '../../model/test-instance';
import {ActivatedRoute} from '@angular/router';
import {Test} from '../../model/test';
import {AssignModalComponent} from '../../common-components/assign-modal/assign-modal.component';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {Applicant} from '../../model/applicant';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-applicant-test-list',
  templateUrl: './applicant-test-list.component.html',
  styleUrls: ['./applicant-test-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicantTestListComponent implements OnInit {
  @Input('replicant') replicant: Applicant;
  private tests: TestInstance[];
  private assignableTests: Test[];
  private testTitle: string;
  private testLoading = false;
  private deleteInProgress = false;
  private deleteTestTimestamp: string;
  popover: NgbPopover;

  constructor(private testService: TestService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.paramMap.subscribe( value => this.testService.getTestInstances(value.get('id')).subscribe( (result: Response) => {
      this.tests = JSON.parse(JSON.stringify(result.body)) as TestInstance[];
    }));
  }

  searchTests(): void {
    this.testLoading = true;
    this.assignableTests = null;
    this.testService.getAllTests(this.testTitle)
      .subscribe(tests => {
        this.assignableTests = tests; this.testLoading = false; });
  }

  openAssignModal(testId: number, testName: string) {
    this.popover.close();
    const modalRef = this.modalService.open(AssignModalComponent, {centered: true});
    modalRef.componentInstance.testId = testId;
    modalRef.componentInstance.testName = testName;
    modalRef.componentInstance.applicantId = this.replicant.id;
    modalRef.componentInstance.applicantFirstName = this.replicant.firstName;
    modalRef.componentInstance.applicantLastName = this.replicant.lastName;
    modalRef.componentInstance.onClose.subscribe(val => this.tests.push(val));
  }

  toggleAssign(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      this.testLoading = false;
      this.assignableTests = null;
      this.testTitle = '';
      this.popover = popover;
      popover.open();
    }
  }

  open(content, testTimestamp) {
    this.deleteTestTimestamp = testTimestamp;
    this.modalService.open(content);
  }

  deleteTest() {
    this.deleteInProgress = true;
    this.testService.deleteTestInstance(this.replicant.id, this.deleteTestTimestamp).subscribe(
      res => {
        this.modalService.dismissAll();
        const timestamp = parseInt(this.deleteTestTimestamp, 10);
        this.tests = this.tests.filter(test => test.timestamp !== timestamp);
      },
      (error: HttpErrorResponse) => {
        this.deleteInProgress = false;
        console.log(error);
      });
  }


}
