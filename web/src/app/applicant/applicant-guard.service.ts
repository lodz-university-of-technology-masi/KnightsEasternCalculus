import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import {ApplicantService} from '../services/applicant.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantGuardService implements CanActivate{

  constructor(private authService: AuthenticationRecruiterService, private router: Router, private applicants: ApplicantService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const groups = this.authService.getIdToken()['cognito:groups'];
    let flag = false;
    groups.forEach(group => {
      if (group === 'client') {
        flag = true;
      }
    });

    return new Observable( observer => {
      if (flag) {
        this.applicants.getApplicant(this.authService.getUserId()).subscribe( result => {
          if (result.id === this.authService.getUserId()) {
            observer.next(true);
            observer.complete();
          } else {
            this.router.navigateByUrl('/register');
            observer.next(false);
            observer.complete();
          }
        }, error => {
          this.router.navigateByUrl('/register');
          observer.next(false);
          observer.complete();
        });
      } else {
        observer.next(false);
        this.router.navigateByUrl('/404');
        observer.complete();
      }
    });
  }


}
