import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicantService} from '../../../services/applicant.service';

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
  loading = false;

  constructor(public activeModal: NgbActiveModal, private applicantService: ApplicantService) { }

  ngOnInit() {
  }

  confirm() {
    this.loading = true;
    this.applicantService.assignApplicantToTest(this.testId, this.applicantId).subscribe(val => this.activeModal.close());
  }

}
