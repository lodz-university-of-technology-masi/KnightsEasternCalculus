import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { RecruiterApplicantProfileComponent } from './recruiter-applicant-profile/recruiter-applicant-profile.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { FormsModule } from '@angular/forms';
import { RecruiterRoutingModule } from './recruiter.routing.module';
import { RecruiterNavigationComponent } from './recruiter-navigation/recruiter-navigation.component';
import { AppRecruiterComponent } from './app-recruiter/app-recruiter.component';
import { ShowAllTestsComponent } from './show-all-tests/show-all-tests.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ApplicantTestListComponent } from './applicant-test-list/applicant-test-list.component';
import { UpdateTestComponent } from './update-test/update-test.component';
import {
  NgbAlertModule,
  NgbButtonsModule,
  NgbDropdownModule,
  NgbPopoverModule,
  NgbToastModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { AssignModalComponent } from '../common-components/assign-modal/assign-modal.component';
import { GradeTestComponent } from './grade-test/grade-test.component';
import { ImportTestComponent } from './import-test/import-test.component';
import { CheckTestsComponent } from './check-tests/check-tests.component';
import { SolvedTestComponent } from './solved-test/solved-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ApplicantListComponent,
    RecruiterApplicantProfileComponent,
    LinkGeneratorComponent,
    CreateTestComponent,
    ShowAllTestsComponent,
    RecruiterNavigationComponent,
    AppRecruiterComponent,
    ApplicantTestListComponent,
    UpdateTestComponent,
    AssignModalComponent,
    GradeTestComponent,
    ImportTestComponent,
    CheckTestsComponent,
    SolvedTestComponent,
    EditTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecruiterRoutingModule,
    CommonComponentsModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgbToastModule
  ],
  bootstrap: [AssignModalComponent],
})
export class RecruiterModule { }
