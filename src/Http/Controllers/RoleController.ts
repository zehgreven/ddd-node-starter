import { serialize } from 'class-transformer';
import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';

import { RoleDTO } from '@src/Domain/Role/RoleDTO';

import { Pagination } from '../../Domain/Core/Pagination';
import { Role } from '../../Domain/Role/Role';
import { RoleService } from '../../Domain/Role/RoleService';
import { IRequest } from '../../Utils/Request/custom';
import { authMiddleware } from '../Middleware/CustomMiddleware';

@controller('/roles', authMiddleware)
export class RoleController {
  constructor(@inject('RoleService') private service: RoleService) {}

  /**
   * @param {IRequest} request
   * @param {Response} response
   *
   * @returns {Role[]}
   */
  @httpGet('/')
  public async all(request: IRequest, response: Response): Promise<string> {
    return this.service.all(Pagination.fromRequest(request)).then((data: [Role[], number]) => {
      response.set('X-Items-Count', data[1].toString());
      return serialize(data[0]);
    });
  }

  /**
   * @param {Request} request
   * @returns {Promise<Role>}
   */
  @httpGet('/:id')
  public async byId(request: IRequest): Promise<string> {
    return this.service.byId(request.params.id).then((data: Role) => {
      return serialize(data);
    });
  }

  /**
   * @param {Request} request
   * @param {Response} response
   * @returns {Promise<Role>}
   */
  @httpPost('/')
  public async save(request: IRequest, response: Response): Promise<string> {
    return this.service.save(RoleDTO.fromRequest(request)).then((data: Role) => {
      response.status(201);
      return serialize(data);
    });
  }

  /**
   * @param {Request} request
   * @param {Response} response
   * @returns {Promise<Role>}
   */
  @httpPut('/:id')
  public async update(request: IRequest, response: Response): Promise<string> {
    return this.service.update(request.params.id, RoleDTO.fromRequest(request)).then((role: Role) => {
      response.status(201);
      return serialize(role);
    });
  }

  /**
   * @param {Request} request
   * @param {Response} response
   */
  @httpDelete('/:id')
  public async remove(request: IRequest, response: Response): Promise<any> {
    return this.service.remove(request.params.id).then(() => {
      response.set('X-Items-Count', '0');
      response.status(204);
    });
  }
}
