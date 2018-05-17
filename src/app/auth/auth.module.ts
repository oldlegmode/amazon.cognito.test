import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// services
import { CognitoService } from '../services/aws/cognito.service';
import { UserLoginService } from '../services/aws/login.service';

// components
import { LoginComponent } from './login';
import {CredentialsComponent} from './credentials/credentials.component';

@NgModule({
  declarations: [
    LoginComponent,
    CredentialsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CognitoService,
    UserLoginService
  ],
  exports: [
    LoginComponent,
    CredentialsComponent
  ]
})

export class AuthModule {}
