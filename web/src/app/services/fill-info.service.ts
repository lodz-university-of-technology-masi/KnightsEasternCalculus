import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Applicant} from '../model/applicant';

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
    private httpClient: HttpClient
  ) { }

  addApplicantUrl: string = "https://luznpx1mg3.execute-api.us-east-1.amazonaws.com/Test/applicants";
  public addPer(id, firstName, lastName, date, address, city, postal, email, phone, experiences, univer, aboutMe, photoUrl): void {
    var applicant = new Applicant(id, firstName, lastName, date, address, city, postal, email, phone, experiences, univer, aboutMe, photoUrl);
    this.httpClient.post<Applicant>(this.addApplicantUrl, applicant, httpOptions).subscribe({
      error: error => ({}),
      complete: () => { }
    });
  }
}
