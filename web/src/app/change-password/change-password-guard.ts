import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuard implements  CanActivate {

  constructor(private authService: AuthenticationRecruiterService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.cognitoUser != null) {
      return true;
    } else if (this.authService.isLogged()) {
      this.authService.getGroups().forEach( g => {
        if (g === 'recruiter') {
          this.router.navigateByUrl('/recruiter');
        } else if (g === 'client') {
          this.router.navigateByUrl('/applicant');
        }
        return false;
      });
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
