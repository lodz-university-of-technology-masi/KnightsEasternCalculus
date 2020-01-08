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
    const groups = this.authService.getIdToken()['cognito:groups'];
    let flag = false;
    groups.forEach(group => {
      if (group === 'client') {
        flag = true;
      }
    });

    if (flag) {
      return true;
    } else {
      this.router.navigateByUrl('/404');
      return false;
    }
  }

}
