import { Injectable } from '@angular/core';
import { Applicant } from '../model/applicant';
import { Experience } from '../model/experience';
import { University } from '../model/university';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import * as Globals from '../app-consts';
import 'rxjs-compat/add/operator/catch';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  private apiUrl = Globals.apiBaseUrl + '/applicants';

  constructor(private http: HttpClient) {}

  // supposed to return 10 of the latest added applicants
  getAllApplicants(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.apiUrl);
  }

  getApplicants(lastName: string): Observable<Applicant[]> {
    const params = new HttpParams().set('lastName', lastName);
    return this.http.get<Applicant[]>(this.apiUrl, { params });
  }

  getApplicant(id: string): Observable<Applicant> {
    return this.http.get<Applicant>(this.apiUrl + `/${id}`);
  }

}
