import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ApplicantListComponent } from '../applicant-list/applicant-list.component';
import { SignupComponent } from '../signup/signup.component';
import {ConfirmCodeComponent} from '../confirm-code/confirm-code.component';
import {LinkGeneratorComponent} from '../link-generator/link-generator.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
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
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
