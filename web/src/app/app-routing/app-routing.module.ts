import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ApplicantListComponent } from '../recruiter/applicant-list/applicant-list.component';
import { ApplicantProfileComponent } from '../recruiter/applicant-profile/applicant-profile.component';
import { SignupComponent } from '../signup/signup.component';
import {ConfirmCodeComponent} from '../confirm-code/confirm-code.component';
import {LinkGeneratorComponent} from '../recruiter/link-generator/link-generator.component';
import { HomePageComponent } from '../recruiter/home-page/home-page.component';
import { CreateTestComponent } from '../recruiter/create-test/create-test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recruiter', // '/login',
    pathMatch: 'full'
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
    path: 'recruiter',
    loadChildren: () => import('../recruiter/recruiter.module').then(m => m.RecruiterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
