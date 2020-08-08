import { Request } from 'express';
import * as validate from 'express-validation';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';

import { AuthService } from '@src/Domain/Auth/AuthService';
import { SignInDTO } from '@src/Domain/Auth/SignInDTO';
import * as signInValidator from '@src/Domain/Auth/SignInValidator';

@controller('/auth/sign-in')
export class SignInController {
  constructor(@inject('AuthService') private authService: AuthService) {}

  /**
   * @param {Request} request
   * @returns {Promise<void>}
   */
  @httpPost('/', validate(signInValidator))
  public async signIn(request: Request): Promise<any> {
    return this.authService.signIn(SignInDTO.fromRequest(request));
  }
}
