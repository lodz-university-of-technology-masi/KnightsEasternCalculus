import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicantService} from '../../services/applicant.service';
import {TestInstance} from '../../model/test-instance';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.scss']
})
export class AssignModalComponent implements OnInit {
  @Input() testId;
  @Input() testName;
  @Input() applicantId;
  @Input() applicantFirstName;
  @Input() applicantLastName;
  @Output() onClose: EventEmitter<TestInstance> = new EventEmitter();
  loading = false;
  needsConfirmation = false;
  existingTests: string[];

  constructor(public activeModal: NgbActiveModal, private applicantService: ApplicantService) {
  }

  ngOnInit() {
  }

  confirm() {
    this.loading = true;
    this.applicantService.assignApplicantToTest(this.testId, this.applicantId, this.needsConfirmation).subscribe(
      res => {
        this.activeModal.close();
        this.onClose.emit(res.body as unknown as TestInstance);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 409) {
          this.needsConfirmation = true;
          this.existingTests = error.error;
        }
        console.log(error);
      });
  }

}
