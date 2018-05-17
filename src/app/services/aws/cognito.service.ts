import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export interface CognitoCallback {
  cognitoCallback(message: string, result: any): void;
}

export interface CognitoConfigInterface {
  region: string;
  identityPoolId: string;
  userPoolId: string;
  clientId: string;
}

@Injectable()
export class CognitoService {
  public region: string;
  public identityPoolId: string;
  public userPoolId: string;
  public clientId: string;

  public getCognitoUserPool(): CognitoUserPool {
    return new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId
    });
  }
  public getCurrentUser() {
    return this.getCognitoUserPool().getCurrentUser();
  }

  public setCredentials(config: CognitoConfigInterface): void {
    this.region = config.region;
    this.identityPoolId = config.identityPoolId;
    this.userPoolId = config.userPoolId;
    this.clientId = config.clientId;
  }
}
