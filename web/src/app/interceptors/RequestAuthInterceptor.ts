import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class RequestAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationRecruiterService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getRawIdToken();
    let authReq: HttpRequest<any>;

    if (authToken && authToken.length > 0) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
    } else {
      authReq = req;
    }

    return next.handle(authReq).pipe(
      tap(ev => {},
        error => {
          const err = error as HttpErrorResponse;
          if (err.status === 401 && err.error.message === 'The incoming token has expired') {
            this.authService.expire();
            this.router.navigateByUrl('/login');
          }
        }
      )
    );
  }
}
