import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {ConfirmCodeComponent} from '../confirm-code/confirm-code.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';

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
    path: 'confirm',
    component: ConfirmCodeComponent
  },
  {
    path: 'recruiter',
    loadChildren: () => import('../recruiter/recruiter.module').then(m => m.RecruiterModule)
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
