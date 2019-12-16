import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ShowAllTestsComponent } from './show-all-tests/show-all-tests.component';
import {AppRecruiterComponent} from './app-recruiter/app-recruiter.component';

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
        path: 'applicant/:id',
        component: ApplicantProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
