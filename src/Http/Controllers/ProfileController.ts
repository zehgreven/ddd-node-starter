import { serialize } from 'class-transformer';
import { Response } from 'express';
import * as validate from 'express-validation';
import { inject } from 'inversify';
import { controller, httpGet, httpPut } from 'inversify-express-utils';

import { IUserService } from '../../Domain/User/IUserService';
import { User } from '../../Domain/User/User';
import { ProfileDTO } from '../../Infrastructure/DTO/Profile/ProfileDTO';
import * as profileValidator from '../../Infrastructure/Validators/Profile/ProfileValidator';
import { IRequest } from '../../Utils/Request/custom';
import { authMiddleware } from '../Middleware/CustomMiddleware';

@controller('/users/me', authMiddleware)
export class ProfileController {
  constructor(@inject('IUserService') private userService: IUserService) {}

  /**
   * @param {IRequest} request
   */
  @httpGet('/')
  public me(request: IRequest) {
    return serialize(request.user, { groups: ['detail'] });
  }

  /**
   * @param {IRequest} request
   * @param {Response} response
   */
  @httpPut('/', validate(profileValidator))
  public async update(request: IRequest, response: Response) {
    return await this.userService.update(request.user.id, ProfileDTO.fromRequest(request)).then((user: User) => {
      response.status(202);
      return serialize(user);
    });
  }
}
