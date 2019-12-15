import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';

const poolData = {
  UserPoolId: 'us-east-1_O71Y6W7F7',
  ClientId: '7p1gd7qu0klpa8kkt7oiqjjnv8'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {
  cognitoUser: any;

  constructor() { }

  signUp(email, password) {
    const attr = [
      {}
    ]
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
