import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantNavigationComponent } from './applicant-navigation/applicant-navigation.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule} from '@angular/forms';
import {AppApplicantComponent} from './app-applicant/app-applicant.component';
import {ApplicantRoutingModule} from './applicant.routing.module';



@NgModule({
  declarations: [
    ApplicantNavigationComponent,
    HomePageComponent,
    AppApplicantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicantRoutingModule
  ]
})
export class ApplicantModule { }
