import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantGuardService implements CanActivate{

  constructor(private authService: AuthenticationRecruiterService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getIdToken();
    if (token['cognito:username'] === route.data.id) {
      return true;
    }

    this.router.navigateByUrl('/applicant');
    return false;
  }

}
