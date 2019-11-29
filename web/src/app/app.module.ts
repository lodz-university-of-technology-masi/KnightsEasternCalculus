import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module'
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    HomePageComponent,
    LoginComponent,
    ApplicantListComponent,
    SignupComponent,
    ConfirmCodeComponent,
    LinkGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
