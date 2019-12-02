import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ApplicantListComponent } from '../applicant-list/applicant-list.component';
import { ApplicantProfileComponent } from '../applicant-profile/applicant-profile.component';
import { SignupComponent } from '../signup/signup.component';
import {ConfirmCodeComponent} from '../confirm-code/confirm-code.component';
import {LinkGeneratorComponent} from '../link-generator/link-generator.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { CreateTestComponent } from '../create-test/create-test.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'applicants',
    component: ApplicantListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'confirm',
    component: ConfirmCodeComponent
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
    path: 'applicant/:id',
    component: ApplicantProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
