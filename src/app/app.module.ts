import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AuthModule } from './auth';
import { TokenService } from './services/';
import { Token } from './services/';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule
  ],
  providers: [TokenService, Token],
  bootstrap: [AppComponent]
})
export class AppModule { }
