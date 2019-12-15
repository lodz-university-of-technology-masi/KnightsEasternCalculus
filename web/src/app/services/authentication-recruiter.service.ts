import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {BoundEventAst} from '@angular/compiler';

const poolData = {
  UserPoolId: 'us-east-1_NUJRkt4zb',
  ClientId: '7aohbrhv5cb8q74gf4ns5r2bdr'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})

export class AuthenticationRecruiterService {
  cognitoUser: any;
  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();
  private sessionUserAttributes;
  private accessToken: any;

  constructor() {}

  signUp(username, password, name, surname, email) {
    console.log(email);
    const attrs = [
      {
      Name: 'email',
      Value: email
      },
      {
        Name: 'name',
        Value: surname
      },
      {
        Name: 'given_name',
        Value: name
      }
      ];
    const attributeList = [];
    attrs.forEach(attr => {
      attributeList.push(new CognitoUserAttribute(attr));
    });
    return new Observable((observer) => {
      userPool.signUp(username, password, attributeList, null, (err, result) => {
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

  signIn(username, password) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: userPool
    };
    this.cognitoUser = new CognitoUser(userData);
    return new Observable(observer => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          this.accessToken = result.getAccessToken().getJwtToken();
          this.username.next(userPool.getCurrentUser().getUsername());
          observer.next(result);
          observer.complete();
        }, onFailure: err => {
          console.log(err);
          observer.error(err);
        }, newPasswordRequired: ((userAttributes, requiredAttributes) => {
          delete userAttributes.email_verified;
          this.sessionUserAttributes = userAttributes;
          observer.next('newPass');
          observer.complete();
        })
      });
    });
  }

  setNewPassword(newPassword, name, surname) {
    this.sessionUserAttributes.name = name;
    this.sessionUserAttributes.given_name = surname;
    return new Observable( observer => {
      this.cognitoUser.completeNewPasswordChallenge(newPassword, this.sessionUserAttributes, {
        onSuccess: result => {
          console.log('inside');
          console.log(result);
          observer.next(result);
          observer.complete();
        }, onFailure: err => {
          console.log('setNewPassword: ' + err.toString());
          observer.error(err);
        }
      });
    });
  }


  isLogged(): boolean {
    return userPool.getCurrentUser() != null;
  }

  getUsername() {
    return userPool.getCurrentUser().getUsername();
  }

  getUser() {
    return userPool.getCurrentUser();
  }

  getAccessToken() {
    return this.accessToken;
  }

  logOut() {
    this.getUser().signOut();
    this.cognitoUser = null;
  }

}
