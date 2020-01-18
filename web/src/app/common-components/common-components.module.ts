import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicantProfileComponent} from './applicant-profile/applicant-profile.component';
import {RouterModule} from '@angular/router';
import { TestResultsComponent } from './test-results/test-results.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SecurePipe} from '../pipes/SecurePipe';



@NgModule({
  declarations: [ApplicantProfileComponent, TestResultsComponent, SecurePipe],
  exports: [
    ApplicantProfileComponent,
    TestResultsComponent,
    SecurePipe
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule
  ]
})
export class CommonComponentsModule { }
