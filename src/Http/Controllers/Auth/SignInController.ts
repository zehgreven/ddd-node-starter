import { Request } from 'express';
import * as validate from 'express-validation';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';

import { IAuthService } from '../../../Domain/Core/IAuthService';
import { SignInDTO } from '../../../Infrastructure/DTO/Auth/SignInDTO';
import * as signInValidator from '../../../Infrastructure/Validators/Auth/SignInValidator';

@controller('/auth/sign-in')
export class SignInController {
  constructor(@inject('IAuthService') private authService: IAuthService) {}

  /**
   * @param {Request} request
   * @returns {Promise<void>}
   */
  @httpPost('/', validate(signInValidator))
  public async signIn(request: Request): Promise<any> {
    return this.authService.signIn(SignInDTO.fromRequest(request));
  }
}
