import { Builder } from 'builder-pattern';
import { Request } from 'express';

export class SignUpDTO {
  private _login: string;

  private _password: string;

  constructor(login: string, password: string) {
    this._login = login;
    this._password = password;
  }

  /**
   * @param  {Request} request
   * @returns SignUpDTO
   */
  static fromRequest(request: Request): SignUpDTO {
    return Builder<SignUpDTO>().login(request.body.login).password(request.body.password).build();
  }

  get login(): string {
    return this._login;
  }

  get password(): string {
    return this._password;
  }
}
