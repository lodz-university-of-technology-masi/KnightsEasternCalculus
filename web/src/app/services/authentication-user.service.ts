import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import {Observable} from "rxjs";

const poolData = {
  UserPoolId: ' us-east-1_yrT3VReQk',
  ClientId: 'kddn8vdbbi1r5mnfqjmu47vhm'
}

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {
  cognitoUser: any;

  constructor() { }

  signUp(email, password) {
    console.log(email);
    const attributeList = [];
    return new Observable( (observer) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          observer.error(err);
          return;
        }
        this.cognitoUser = result.user;
        observer.next(result);
        observer.complete();
      });
    });
  }
}
