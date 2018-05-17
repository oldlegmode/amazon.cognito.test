import { Token } from './token';

export interface TokenCallback {
  callbackWithParam(result: string): void;
}

export class JwtTokenCallback implements TokenCallback {
  constructor(private token: Token) {}

  public callbackWithParam(result) {
    this.token.jwtToken = result;
  }
}
