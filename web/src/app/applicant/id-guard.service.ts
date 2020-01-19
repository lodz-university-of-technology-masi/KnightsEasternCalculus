import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRecruiterService } from '../services/authentication-recruiter.service';

@Injectable({
  providedIn: 'root'
})
export class IdGuardService implements CanActivate{

  constructor(public authService: AuthenticationRecruiterService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getIdToken();
    if (token['cognito:username'] === route.params.id.split('=')[0]) {
      return true;
    }

    this.router.navigateByUrl('/applicant');
    return false;
  }
}
