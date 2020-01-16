import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthenticationRecruiterService} from '../services/authentication-recruiter.service';

@Injectable()
export class RequestAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationRecruiterService) { }

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

    return next.handle(authReq);
  }
}
