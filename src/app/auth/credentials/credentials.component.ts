import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CognitoConfigInterface, CognitoService } from '../../services/aws/cognito.service';

@Component({
  selector: 'app-credentials-component',
  templateUrl: './credentials.html'
})

export class CredentialsComponent implements OnInit {
  public isSetUp: boolean;
  public CredentialsForm: FormGroup;
  public credentials: CognitoConfigInterface  = {
    region: '',
    identityPoolId: '',
    userPoolId: '',
    clientId: ''
  };

  constructor(public cognitoService: CognitoService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.CredentialsForm = this.fb.group(this.credentials);
  }

  public setCredentials(): void {
    this.cognitoService.setCredentials(this.credentials);
    this.isSetUp = true;
  }
}


