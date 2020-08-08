import { serialize } from 'class-transformer';
import { Request, Response } from 'express';
import * as validate from 'express-validation';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';

import { AuthService } from '@src/Domain/Auth/AuthService';
import { SignUpDTO } from '@src/Domain/Auth/SignUpDTO';
import * as signUpValidator from '@src/Domain/Auth/SignUpValidator';
import { User } from '@src/Domain/User/User';

@controller('/auth/sign-up')
export class SignUpController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  /**
   * @param {Request} request
   * @param {Response} response
   *
   * @returns {Promise<string>}
   */
  @httpPost('/', validate(signUpValidator))
  public async signUp(request: Request, response: Response): Promise<string> {
    return this.authService.signUp(SignUpDTO.fromRequest(request)).then((user: User) => {
      response.status(201);
      return serialize(user);
    });
  }
}
