import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {ConfirmCodeComponent} from '../confirm-code/confirm-code.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {FillInfoComponent} from '../fill-info/fill-info.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {RecruiterGuardService} from '../recruiter/recruiter-guard.service';
import {DenyComponent} from '../deny/deny.component';
import {ApplicantGuardService} from '../applicant/applicant-guard.service';
import {RootGuard} from '../services/root-guard.service';
import {AppComponent} from '../app.component';
import {ChangePasswordGuard} from '../change-password/change-password-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RootGuard],
    component: AppComponent
  },
  {
    path: 'applicant',
    loadChildren: () => import('../applicant/applicant.module').then(m => m.ApplicantModule),
    canActivate: [AuthGuardService, ApplicantGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'confirm',
    component: ConfirmCodeComponent
  },
  {
    path: 'recruiter',
    loadChildren: () => import('../recruiter/recruiter.module').then(m => m.RecruiterModule),
    canActivate: [AuthGuardService, RecruiterGuardService]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [ChangePasswordGuard]
  },
  {
    path: 'register',
    component: FillInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'access-denied',
    component: DenyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
