import { EntityException } from '../Core/EntityException';

export class RoleException extends EntityException {
  /**
   * @param {string} id
   * @returns {RoleException}
   */
  static fromId(id: string): RoleException {
    return new RoleException(`Role with ID #${id} not found.`);
  }

  /**
   * @param  {string} idParam
   * @param  {string} idDTO
   * @returns RoleException
   */
  static paramDifferFromBody(idParam: string, idDTO: string): RoleException {
    return new RoleException(`Param with ID #${idParam} differs from body with ID #${idDTO}.`);
  }
}
