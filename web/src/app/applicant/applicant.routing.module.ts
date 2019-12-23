import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppApplicantComponent} from './app-applicant/app-applicant.component';
import {HomePageComponent} from './home-page/home-page.component';
const routes: Routes = [
  {
    path: '', component: AppApplicantComponent, children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantRoutingModule { }
