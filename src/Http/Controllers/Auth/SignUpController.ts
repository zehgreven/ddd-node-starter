import { serialize } from 'class-transformer';
import { Request, Response } from 'express';
import * as validate from 'express-validation';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';

import { IAuthService } from '../../../Domain/Core/IAuthService';
import { User } from '../../../Domain/User/User';
import { SignUpDTO } from '../../../Infrastructure/DTO/Auth/SignUpDTO';
import * as signUpValidator from '../../../Infrastructure/Validators/Auth/SignUpValidator';

@controller('/auth/sign-up')
export class SignUpController {
  constructor(@inject('IAuthService') private authService: IAuthService) {}

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
