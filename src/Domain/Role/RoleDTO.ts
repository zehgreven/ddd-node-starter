import { Builder } from 'builder-pattern';
import { Request } from 'express';

import { BaseDTO } from '../Core/BaseDTO';

export class RoleDTO extends BaseDTO {
  private _parent: RoleDTO;

  private _name: string;

  private _description: string;

  private _path: string;

  private _code: string;

  /**
   * @param {Request} request
   * @returns {RoleDTO}
   */
  static fromRequest(request: Request): RoleDTO {
    return Builder<RoleDTO>()
      .id(request.body.id)
      .isActive(request.body.isActive)
      .name(request.body.name)
      .path(request.body.path)
      .code(request.body.code)
      .description(request.body.description)
      .parent(request.body.parent)
      .build();
  }

  get parent(): RoleDTO {
    return this._parent;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get path(): string {
    return this._path;
  }

  get code(): string {
    return this._code;
  }
}
