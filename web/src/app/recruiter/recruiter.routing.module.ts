import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { RecruiterApplicantProfileComponent } from './recruiter-applicant-profile/recruiter-applicant-profile.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ShowAllTestsComponent } from './show-all-tests/show-all-tests.component';
import { AppRecruiterComponent } from './app-recruiter/app-recruiter.component';
import { UpdateTestComponent } from './update-test/update-test.component';
import { GradeTestComponent } from './grade-test/grade-test.component';
import { ImportTestComponent } from './import-test/import-test.component';
import {CheckTestsComponent} from './check-tests/check-tests.component';
import {TestRequest} from '@angular/common/http/testing';
import {TestResultsComponent} from '../common-components/test-results/test-results.component';
import {SolvedTestComponent} from './solved-test/solved-test.component';

const routes: Routes = [
  {
    path: '', component: AppRecruiterComponent, children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'applicants',
        component: ApplicantListComponent
      },
      {
        path: 'generate-link',
        component: LinkGeneratorComponent
      },
      {
        path: 'create-test',
        component: CreateTestComponent
      },
      {
        path: 'show-all-tests',
        component: ShowAllTestsComponent
      },
      {
        path: 'import-test',
        component: ImportTestComponent
      },
      {
        path: 'show-all-tests/update-test/:id',
        component: UpdateTestComponent
      },
      {
        path: 'applicant/:id',
        component: RecruiterApplicantProfileComponent
      },
      {
        path: 'applicant/:id/test/:timestamp',
        component: GradeTestComponent
      },
      {
        path: 'unchecked-tests',
        component: CheckTestsComponent
      },
      {
        path: 'applicant/:id/solved/:timestamp',
        component: SolvedTestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
