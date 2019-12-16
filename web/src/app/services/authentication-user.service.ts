import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';

const poolData = {
  UserPoolId: 'us-east-1_ZfAACokkR',
  ClientId: '3qvj2ap1l40t7tr5j35i472u6n'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {
  cognitoUser: CognitoUser;

  constructor() { }

  sendMail(email: string) {
    const mail = {
      Name: 'email',
      Value: email
    }
    const attributeList = [new CognitoUserAttribute(mail)];
    return new Observable(observer => {
      userPool.signUp(email, 'password', attributeList, null, (err, result) => {
        if (err) {
          console.log('signup error: ', err);
          observer.error(err);
          return;
        }
        console.log('signup correct');
        this.cognitoUser = result.user;
        observer.next(result);
        observer.complete();
      });
    });
  }

  confirmCode(username, code, password) {
    this.signIn(username, 'password');

    const user = {
      Username: this.cognitoUser.getUsername(),
      Pool: userPool
    };

    const attrs = [];

    return new Observable(observer => {
      const cUser = new CognitoUser(user);
      cUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log('code confirmation error', err);
          observer.error(err);
          return;
        }

        this.cognitoUser.completeNewPasswordChallenge(password, attrs, {
          onSuccess: r => {
           console.log('newpass success');
           console.log('result: ', r);
           observer.next(r);
           observer.complete();
          }, onFailure: e => {
            console.log('newpass err', e);
            observer.error(e);
          }
        });
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
