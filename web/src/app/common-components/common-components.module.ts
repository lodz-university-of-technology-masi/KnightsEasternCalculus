import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicantProfileComponent} from './applicant-profile/applicant-profile.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ApplicantProfileComponent],
  exports: [
    ApplicantProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CommonComponentsModule { }
