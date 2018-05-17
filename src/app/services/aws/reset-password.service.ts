import { Injectable } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoService, CognitoCallback } from './cognito.service';

@Injectable()
export class ResetPasswordService {
  constructor(private cognitoService: CognitoService) {}

  public confirmNewPassword(email: string,
                            verificationCode: string,
                            password: string,
                            callback: CognitoCallback) {
    const userData = {
      Username: email,
      Pool: this.cognitoService.getCognitoUserPool()
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: () => {
        callback.cognitoCallback(null, null);
      },
      onFailure: (err) => {
        callback.cognitoCallback(err.message, null);
      }
    });
  }
}
