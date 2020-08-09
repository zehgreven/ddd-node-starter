import { Builder } from 'builder-pattern';
import * as _ from 'lodash';

import { Role } from './Role';
import { RoleDTO } from './RoleDTO';

export class RoleMapper {
  /**
   * @param  {Role} e
   * @returns RoleDTO
   */
  static toDTO(e: Role): RoleDTO {
    return Builder<RoleDTO>(this.toPrimaryDTO(e))
      .parent(e.parent ? this.toPrimaryDTO(e.parent) : undefined)
      .build();
  }

  /**
   * @param  {Role} e
   * @returns RoleDTO
   */
  static toPrimaryDTO(e: Role): RoleDTO {
    return Builder<RoleDTO>()
      .id(e.id)
      .isActive(e.isActive)
      .name(e.name)
      .description(e.description)
      .code(e.code)
      .path(e.path)
      .build();
  }

  /**
   * @param  {RoleDTO} dto
   * @returns Role
   */
  static toEntity(dto: RoleDTO): Role {
    const role: Role = this.toPrimaryEntity(dto);
    if (dto.parent) {
      role.parent = this.toEntity(dto.parent);
    }
    return role;
  }

  /**
   * @param  {RoleDTO} dto
   * @returns Role
   */
  static toPrimaryEntity(dto: RoleDTO): Role {
    return Builder(Role)
      .id(dto.id)
      .isActive(dto.isActive)
      .name(dto.name)
      .description(dto.description)
      .code(dto.code)
      .path(dto.path)
      .build();
  }
}
