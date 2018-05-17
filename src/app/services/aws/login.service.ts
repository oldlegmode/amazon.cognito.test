import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoService } from './cognito.service';

export interface LoggedInCallback {
  isLoggedIn(message: string, loggedIn: boolean): void;
}

@Injectable()
export class UserLoginService {
  private cognitoUser: CognitoUser;
  constructor(private cognitoService: CognitoService) {}

  public authenticate(username: string, password: string, callback: LoggedInCallback): void {
    // console.log('username: ', username, 'password: ', password);
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username : username,
      Pool : this.cognitoService.getCognitoUserPool()
    };
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        // console.log('access token + ' + result.getAccessToken().getJwtToken());
        /*Use the idToken for Logins Map when Federating User Pools with identity pools
         or when passing through an Authorization Header to an API Gateway Authorizer*/
        // console.log('idToken + ' + result.getIdToken().getJwtToken());

        callback.isLoggedIn('Authenticate succeeded', true);
      },
      onFailure: (err) => {
        callback.isLoggedIn('Authenticate failed', false);
      },
    });
  }

  public logOut(): void {
    try {
      if (this.cognitoService.getCurrentUser()) {
        this.cognitoService.getCurrentUser().signOut();
      }
    } catch (e) {
      console.error(e);
    }
  }

  public isAuthenticated(callback: LoggedInCallback): void {
    if (callback == null) {
      try {
        throw new Error('UserLoginService: Callback in isAuthenticated() can not be null');
      } catch (e) {
        console.error(e.message, '\n', e.stack);
      }
    }
    const cognitoUser = this.cognitoService.getCurrentUser();

    if (cognitoUser == null) {
      // console.log('UserLoginService: can not retrieve the current user');
      callback.isLoggedIn('Can not retrieve the CurrentUser', false);
      return;
    }
    cognitoUser.getSession((err, session) => {
      if (err) {
        // console.log('UserLoginService: Could not get the session: ' + err, err.stack);
        callback.isLoggedIn(err, false);
      } else {
        // console.log('UserLoginService: Session is ' + session.isValid());
        callback.isLoggedIn(err, session.isValid());
      }
    });
  }
}

