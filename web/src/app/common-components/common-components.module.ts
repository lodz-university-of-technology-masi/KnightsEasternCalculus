import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicantProfileComponent} from './applicant-profile/applicant-profile.component';
import {RouterModule} from '@angular/router';
import { TestResultsComponent } from './test-results/test-results.component';



@NgModule({
  declarations: [ApplicantProfileComponent, TestResultsComponent],
  exports: [
    ApplicantProfileComponent,
    TestResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CommonComponentsModule { }
