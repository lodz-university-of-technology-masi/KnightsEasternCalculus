import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {BoundEventAst} from '@angular/compiler';
import * as AWS from 'aws-sdk';


const poolData = {
  UserPoolId: 'us-east-1_ARBXLqVHX',
  ClientId: '3edam8edr09uc0tm32vo802vk1'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})

export class AuthenticationRecruiterService {
  cognitoUser: CognitoUser;
  private username = new BehaviorSubject('');
  public currUsername = this.username.asObservable();
  private sessionUserAttributes;

  constructor() {}

  signIn(username, password) {
    return new Observable(observer => {
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
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
          localStorage.setItem('refreshToken', result.getRefreshToken().getToken());


          AWS.config.region = 'us-east-1';
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:6b668023-3071-49da-b222-e7fa4ef3dcde',
            Logins: {
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_ARBXLqVHX': result.getIdToken().getJwtToken()
            }
          });

          AWS.config.getCredentials( err => {
            if (err) { observer.error(err); } else { console.log(AWS.config.credentials); }
          });

          this.cognitoUser.getUserAttributes( (err, res) => {
            if (err) {
              console.log('userattrs err: ', err);
            }
            this.sessionUserAttributes = res;
            res.forEach( value => {
              if (value.getName() === 'email') {
                localStorage.setItem('email', value.getValue());
              }
            });
          });

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

  addToGroup(username, group) {
    return new Observable( observer => {
      const params = {
        GroupName: group,
        UserPoolId: poolData.UserPoolId,
        Username: username
      };

      this.cognitoUser.getSession((err, session) => {
        if (err) {
          observer.error(err);
        }

        console.log('session valid: ', session.isValid());
      });

      const idProvider = new AWS.CognitoIdentityServiceProvider();
      idProvider.adminAddUserToGroup(params, (err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
          observer.complete();
        }
      });
    });
  }

  confirmCode(username, code, password) {
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cUser = new CognitoUser(userData);
    cUser.confirmRegistration(code, false, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      this.signIn(username, 'password').subscribe( res => {
        this.cognitoUser.changePassword('password', password, (e, r) => {
          if (e) {
            console.log(e);
          }
        });

        // TODO "this is only a temporary group name. Change when ready to the user group"
        this.addToGroup(username, 'recruiter').subscribe(re => {
        });
      });
    });
  }

  sendMail(email: string) {
    const mail = {
      Name: 'email',
      Value: email
    };
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

  setNewPassword(newPassword) {
    return new Observable( observer => {
      this.cognitoUser.completeNewPasswordChallenge(newPassword, this.sessionUserAttributes, {
        onSuccess: result => {
          localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
          localStorage.setItem('refreshToken', result.getRefreshToken().getToken());

          observer.next(result);
          observer.complete();
        }, onFailure: err => {
          console.log('setNewPassword: ', err);
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

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }


  getUsername() {
    return localStorage.getItem('email');
  }

  logOut() {
    localStorage.clear();
    this.getUser().signOut();
    this.cognitoUser = null;
  }

}
