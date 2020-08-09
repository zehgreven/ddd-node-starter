import { injectable, inject } from 'inversify';

import { Pagination } from '../Core/Pagination';
import { IRoleRepository } from './IRoleRepository';
import { Role } from './Role';
import { RoleDTO } from './RoleDTO';
import { RoleException } from './RoleException';
import { RoleMapper } from './RoleMapper';

@injectable()
export class RoleService {
  constructor(@inject('RoleRepository') private repository: IRoleRepository) {
    this.repository = repository;
  }

  /**
   * @param {Pagination} pagination
   * @returns {Promise<Role[]>}
   */
  public all(pagination: Pagination): Promise<[Role[], number]> {
    return this.repository.all(pagination);
  }

  /**
   * @param {string} id
   * @returns {Promise<Role>}
   */
  public byId(id: string): Promise<Role> {
    return this.repository.byId(id);
  }

  /**
   * @param {RoleDTO} dto
   * @returns {Promise<Role>}
   */
  public save(dto: RoleDTO): Promise<Role> {
    return this.repository.save(RoleMapper.toEntity(dto));
  }

  /**
   * @param {RoleDTO} dto
   * @returns {Promise<Role>}
   */
  public update(id: string, dto: RoleDTO): Promise<Role> {
    if (id !== dto.id) {
      throw RoleException.paramDifferFromBody(id, dto.id);
    }

    return this.byId(id).then(() => {
      return this.repository.save(RoleMapper.toEntity(dto));
    });
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  public remove(id: string): Promise<void> {
    return this.repository.byId(id).then((user: Role) => {
      user.remove();
      this.repository.save(user);
    });
  }
}
