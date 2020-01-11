import {Component, Input, OnInit} from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestInstance, TestStatus} from '../../model/test-instance';
import {ActivatedRoute} from '@angular/router';
import {Test} from '../../model/test';
import {AssignModalComponent} from '../../common-components/assign-modal/assign-modal.component';
import {NgbModal, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {Applicant} from '../../model/applicant';

@Component({
  selector: 'app-applicant-test-list',
  templateUrl: './applicant-test-list.component.html',
  styleUrls: ['./applicant-test-list.component.scss']
})
export class ApplicantTestListComponent implements OnInit {
  @Input('replicant') replicant: Applicant;
  private tests: TestInstance[];
  private assignableTests: Test[];
  private testTitle: string;
  private testLoading = false;
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

  openAssignModal(testId: string, testName: string) {
    this.popover.close();
    const modalRef = this.modalService.open(AssignModalComponent, {centered: true});
    modalRef.componentInstance.testId = testId;
    modalRef.componentInstance.testName = testName;
    modalRef.componentInstance.applicantId = this.replicant.id;
    modalRef.componentInstance.applicantFirstName = this.replicant.firstName;
    modalRef.componentInstance.applicantLastName = this.replicant.lastName;
    modalRef.componentInstance.onClose.subscribe(val => {
      const t = new TestInstance();
      t.status = TestStatus.NotSolved;
      t.title = val;
      this.tests.push(t);
    });
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


}
