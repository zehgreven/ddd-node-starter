import { Request } from 'express';

export class SignInDTO {
  private _login: string;

  private _password: string;

  constructor(login: string, password: string) {
    this._login = login;
    this._password = password;
  }

  /**
   * @param {Request} request
   * @returns {SignInDTO}
   */
  static fromRequest(request: Request) {
    return new SignInDTO(request.body.login, request.body.password);
  }

  get login(): string {
    return this._login;
  }

  get password(): string {
    return this._password;
  }
}
