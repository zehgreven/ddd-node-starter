import { serialize } from 'class-transformer';
import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet } from 'inversify-express-utils';

import { Pagination } from '../../Domain/Core/Pagination';
import { User } from '../../Domain/User/User';
import { UserService } from '../../Domain/User/UserService';
import { IRequest } from '../../Utils/Request/custom';
import { authMiddleware } from '../Middleware/CustomMiddleware';

@controller('/users', authMiddleware)
export class UserController {
  constructor(@inject('UserService') private userService: UserService) {}

  /**
   * @param {IRequest} request
   * @param {Response} response
   *
   * @returns {User[]}
   */
  @httpGet('/')
  public async all(request: IRequest, response: Response): Promise<any> {
    return this.userService.all(Pagination.fromRequest(request)).then((data: [User[], number]) => {
      response.set('X-Items-Count', data[1].toString());
      return serialize(data[0]);
    });
  }

  /**
   * @param {Request} request
   * @returns {Promise<User>}
   */
  @httpGet('/:id')
  public async byId(request: IRequest): Promise<any> {
    return this.userService.byId(request.params.id).then((user: User) => {
      return serialize(user);
    });
  }

  /**
   * @param {Request} request
   * @param {Response} response
   */
  @httpDelete('/:id')
  public async remove(request: IRequest, response: Response): Promise<any> {
    return this.userService.remove(request.params.id).then(() => {
      response.set('X-Items-Count', '0');
      response.status(204);
    });
  }
}
