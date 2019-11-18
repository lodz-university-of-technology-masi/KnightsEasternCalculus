import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import {Observable, Observer} from 'rxjs';

const poolData = {
  UserPoolId: 'us-east-1_maoLGJo3a',
  ClientId: '1p7skigilekib35sropv0qt3mq'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  cognitoUser: any;

  constructor() { }

  signup(email, password) {
    const attributeList = [];
    return new Observable((observer) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log('signup error', err);
          observer.error(err);
        }
        this.cognitoUser = result.user;
        console.log('signup succsesful', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  confirmAuth(code) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };

    return new Observable(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log('code confirmation error', err);
          observer.error(err);
        }
        console.log('code confirmation success', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signUp(email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return new Observable(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          observer.next(result);
          observer.complete();
        }, onFailure: err => {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  isLogged(): boolean {
    return userPool.getCurrentUser() != null;
  }

  getUser() {
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getUser().signOut();
    this.cognitoUser = null;
  }

}
