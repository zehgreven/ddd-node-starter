import { Builder } from 'builder-pattern';
import { Exclude } from 'class-transformer';
import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../Core/BaseEntity';

@Entity('user', { schema: 'acc' })
export class User extends BaseEntity {
  @Column({
    name: 'login',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  login: string;

  @Exclude()
  @Column({
    name: 'password',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  constructor(
    login: string,
    password: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    id?: string
  ) {
    super(isActive, createdAt, updatedAt, deletedAt, id);
    this.login = login;
    this.password = password;
  }

  /**
   * @param {string} login
   * @param {string} password
   *
   * @returns {User}
   */
  static register(login: string, password: string): User {
    return Builder(User).login(login).password(password).build();
  }

  public remove(): void {
    this.deletedAt = new Date();
  }
}
