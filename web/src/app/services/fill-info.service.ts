import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Applicant} from '../model/applicant';
import * as Globals from '../app-consts';
import {AuthenticationRecruiterService} from './authentication-recruiter.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class FillInfoService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationRecruiterService
  ) { }

  addApplicantUrl: string = Globals.apiBaseUrl + '/applicants';
  public addPer(firstName, lastName, date, address, city, postal, email, phone, exper, univers, aboutMe, photoUrl) {
    var applicant = new Applicant(this.authService.getUser().getUsername(), firstName, lastName, date, address, city, postal, this.authService.getUsername(), phone, exper, univers, aboutMe, photoUrl);
    return this.httpClient.post<Applicant>(this.addApplicantUrl, applicant, httpOptions);
  }
}
