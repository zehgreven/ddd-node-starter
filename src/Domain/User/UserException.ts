import { EntityException } from '../Core/EntityException';

export class UserException extends EntityException {
  /**
   * @returns {UserException}
   */
  static authorized(): UserException {
    return new UserException('The login or password is incorrect. Try again, please.');
  }

  /**
   * @param {string} id
   * @returns {UserException}
   */
  static fromId(id: string): UserException {
    return new UserException(`User with ID #${id} not found.`);
  }

  /**
   * @param {string} login
   * @returns {UserException}
   */
  static fromLogin(login: string): UserException {
    return new UserException(`User with login ${login} not found.`);
  }
}
