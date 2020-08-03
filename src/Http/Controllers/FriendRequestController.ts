import { serialize } from 'class-transformer';
import { Response } from 'express';
import * as validate from 'express-validation';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPatch, httpPost } from 'inversify-express-utils';

import { FriendRequest } from '../../Domain/FriendRequest/FriendRequest';
import { IFriendRequestService } from '../../Domain/FriendRequest/IFriendRequestService';
import { FriendRequestDTO } from '../../Infrastructure/DTO/FriendRequest/FriendRequestDTO';
import * as friendRequestValidator from '../../Infrastructure/Validators/FriendRequest/FriendRequestValidator';
import { IRequest } from '../../Utils/Request/custom';
import { authMiddleware } from '../Middleware/CustomMiddleware';

@controller('/friend-requests', authMiddleware)
export class FriendRequestController {
  constructor(@inject('IFriendRequestService') private friendRequestService: IFriendRequestService) {}

  /**
   * @param {IRequest} request
   * @param {Response} response
   *
   * @returns {Promise<void>}
   */
  @httpPost('/', validate(friendRequestValidator))
  public async store(request: IRequest, response: Response) {
    return await this.friendRequestService.store(request.user, FriendRequestDTO.fromRequest(request));
  }

  /**
   * @param {IRequest} request
   * @param {Response} response
   *
   * @returns {Promise<void>}
   */
  @httpPatch('/:id')
  public async accept(request: IRequest, response: Response) {
    return await this.friendRequestService.accept(request.user, parseInt(request.params.id)).then(() => {
      response.status(202);
      return { message: 'Request successfully accepted.' };
    });
  }

  /**
   * @param {Request} request
   * @returns {Promise<FriendRequest>}
   */
  @httpGet('/:id')
  public async byId(request: IRequest) {
    return await this.friendRequestService.byId(parseInt(request.params.id)).then((friendRequest: FriendRequest) => {
      return serialize(friendRequest);
    });
  }

  /**
   * @param {Request} request
   * @param {Response} response
   */
  @httpDelete('/:id')
  public async remove(request: IRequest, response: Response) {
    return await this.friendRequestService.remove(parseInt(request.params.id)).then(() => {
      response.set('X-Items-Count', '0');
      response.status(204);
    });
  }
}
