import { Injectable } from '@angular/core';
import { CognitoService } from '../aws';
import { TokenCallback } from './jwt-token-callback.class';

@Injectable()
export class TokenService {
  constructor (private cognitoService: CognitoService) {}

  public getAccessToken(callback: TokenCallback = null): void {
    if (callback == null) {
      try {
        throw new Error('CognitoUtil: callback in getAccessToken is null...returning');
      } catch (e) {
        console.error(e.message, '\n', e.stack);
      }
      return;
    }
    if (this.cognitoService.getCurrentUser() == null) {
      callback.callbackWithParam(null);
      return;
    }
    this.cognitoService.getCurrentUser().getSession(function (err, session) {
      if (err) {
        // console.log('CognitoUtil: Can not set the credentials:' + err);
        callback.callbackWithParam(null);
      } else {
        if (session.isValid()) {
          callback.callbackWithParam(session.getAccessToken().getJwtToken());
        }
      }
    });
  }

  public getIdToken(callback: TokenCallback = null): void {
    if (callback == null) {
      try {
        throw new Error('CognitoUtil: callback in getIdToken is null...returning');
      } catch (e) {
        console.error(e.message, '\n', e.stack);
      }
      return;
    }
    if (this.cognitoService.getCurrentUser() == null) {
      callback.callbackWithParam(null);
      return;
    }
    this.cognitoService.getCurrentUser().getSession((err, session) => {
      if (err) {
        // console.log('CognitoUtil: Can\'t set the credentials:' + err);
        callback.callbackWithParam(null);
        return;
      }
      if (session.isValid()) {
        // TODO need to comment console
        // console.log('getIdToken: ', session.getIdToken());
        // console.log('getJwtToken: ', session.getIdToken().getJwtToken());
        callback.callbackWithParam(session.getIdToken().getJwtToken());
      } else {
        // console.log('CognitoUtil: Got the id token, but the session isn\'t valid');
      }
    });
  }

  public getRefreshToken(callback: TokenCallback = null): void {
    if (callback == null) {
      try {
        throw new Error('CognitoUtil: callback in getRefreshToken is null...returning');
      } catch (e) {
        console.error(e.message, '\n', e.stack);
      }
      return;
    }
    if (this.cognitoService.getCurrentUser() == null) {
      callback.callbackWithParam(null);
      return;
    }
    this.cognitoService.getCurrentUser().getSession(function (err, session) {
      if (err) {
        // console.log('CognitoUtil: Can not set the credentials:' + err);
        callback.callbackWithParam(null);
      }
      if (session.isValid()) {
        callback.callbackWithParam(session.getRefreshToken());
      }
    });
  }
}
