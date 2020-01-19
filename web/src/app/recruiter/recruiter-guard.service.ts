import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RecruiterGuardService implements CanActivate{

  constructor(public authService: AuthenticationRecruiterService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const groups = this.authService.getGroups();
    let flag = false;
    groups.forEach( group => {
      if (group === 'recruiter') {
        flag = true;
      }
    });

    if (flag) {
      return true;
    } else {
      this.router.navigateByUrl('/access-denied');
      return false;
    }
  }
}
