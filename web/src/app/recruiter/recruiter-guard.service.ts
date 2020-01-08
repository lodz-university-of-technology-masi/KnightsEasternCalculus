import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Injectable({
  providedIn: 'root'
})
export class RecruiterGuardService implements CanActivate{

  constructor(private authService: AuthenticationRecruiterService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const groups = this.authService.getGroups();
    let flag = null;
    flag = groups.indexOf('recruiter');
    if (flag != null) {
      return true;
    }

    console.log(groups);
    this.router.navigateByUrl('/404');
    return false;
  }
}
