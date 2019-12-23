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

  // signUp(username, password, name, surname, email) {
  //   console.log(email);
  //   const attrs = [
  //     {
  //     Name: 'email',
  //     Value: email
  //     },
  //     {
  //       Name: 'name',
  //       Value: surname
  //     },
  //     {
  //       Name: 'given_name',
  //       Value: name
  //     }
  //     ];
  //   const attributeList = [];
  //   attrs.forEach(attr => {
  //     attributeList.push(new CognitoUserAttribute(attr));
  //   });
  //   return new Observable((observer) => {
  //     userPool.signUp(username, password, attributeList, null, (err, result) => {
  //       if (err) {
  //         console.log('signup error', err);
  //         observer.error(err);
  //         return;
  //       }
  //       this.cognitoUser = result.user;
  //       console.log('signup succsesful', result);
  //       observer.next(result);
  //       observer.complete();
  //     });
  //   });
  // }


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
          localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
          localStorage.setItem('refreshToken', result.getRefreshToken().getToken());


          AWS.config.region = 'us-east-1';
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:6b668023-3071-49da-b222-e7fa4ef3dcde',
            Logins: {
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_ARBXLqVHX': result.getIdToken().getJwtToken()
            }
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
    const params = {
      GroupName: group,
      UserPoolId: poolData.UserPoolId,
      Username: username
    };

    this.getUser().getSession( (err, session) => {
      if (err) {
        console.log('session err: ', err);
        return;
      }

      console.log('session valid: ', session.isValid());
      const creds = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:6b668023-3071-49da-b222-e7fa4ef3dcde',
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_ARBXLqVHX': session.getIdToken().getJwtToken()
        }
      });

      AWS.config.update({
        region: 'us-east-1',
        credentials: creds
      });
    });

    AWS.config.getCredentials( err => {
      if (err) { console.log(err); } else { console.log(AWS.config); }
    });

    const idProvider = new AWS.CognitoIdentityServiceProvider();
    idProvider.adminAddUserToGroup(params, (err, data) => {
      if (err) {
        console.log('addToGroupErr: ', err);
      } else {
        console.log(data);
      }
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

  setNewPassword(newPassword, name, surname) {
    this.sessionUserAttributes.name = name;
    this.sessionUserAttributes.given_name = surname;
    return new Observable( observer => {
      this.cognitoUser.completeNewPasswordChallenge(newPassword, this.sessionUserAttributes, {
        onSuccess: result => {
          localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
          localStorage.setItem('refreshToken', result.getRefreshToken().getToken());

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
    return new Observable( observer => {
      observer.next(localStorage.getItem('email'));
      observer.complete();
    });
  }

  logOut() {
    localStorage.clear();
    this.getUser().signOut();
    this.cognitoUser = null;
  }

}
