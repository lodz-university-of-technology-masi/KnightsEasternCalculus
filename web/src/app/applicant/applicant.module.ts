import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantNavigationComponent } from './applicant-navigation/applicant-navigation.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FormsModule} from '@angular/forms';
import {AppApplicantComponent} from './app-applicant/app-applicant.component';
import {ApplicantRoutingModule} from './applicant.routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import { TestListComponent } from './test-list/test-list.component';
import { SolvedTestComponent } from './solved-test/solved-test.component';
import {SolveTestComponent} from './solve-test/solve-test.component';



@NgModule({
  declarations: [
    ApplicantNavigationComponent,
    HomePageComponent,
    AppApplicantComponent,
    MyProfileComponent,
    TestListComponent,
    SolvedTestComponent,
    SolveTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicantRoutingModule,
    CommonComponentsModule
  ]
})
export class ApplicantModule { }

