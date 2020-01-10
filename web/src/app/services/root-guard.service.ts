import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationRecruiterService} from './authentication-recruiter.service';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {
  constructor(private authService: AuthenticationRecruiterService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLogged()) {
      if(this.authService.getGroups().includes('recruiter')) {
        this.router.navigateByUrl('/recruiter');
        return true;
      } else if(this.authService.getGroups().includes('applicant')) {
        this.router.navigateByUrl('/applicant');
        return true;
      }
      return false;
    }

    this.router.navigateByUrl('/login');
    return false;
  }

}
