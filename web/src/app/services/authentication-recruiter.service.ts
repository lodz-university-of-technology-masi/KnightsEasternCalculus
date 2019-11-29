import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {BoundEventAst} from '@angular/compiler';

const poolData = {
  UserPoolId: 'us-east-1_xwOcmFhVK',
  ClientId: '345dlcjkahnlvige9i2f29m8p8'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})

export class AuthenticationRecruiterService {
  cognitoUser: any;
  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();

  constructor() {}

  signUp(email, password) {
    console.log(email);
    const mail = {
      Name: 'email',
      Value: email
    };
    const mailAttr = new CognitoUserAttribute(mail);
    const attributeList = [mailAttr];
    return new Observable((observer) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log('signup error', err);
          observer.error(err);
          return;
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

  signIn(email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    this.cognitoUser = new CognitoUser(userData);
    return new Observable(observer => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
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
