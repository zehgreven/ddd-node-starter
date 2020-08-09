import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../Core/BaseEntity';

@Entity('role', { schema: 'acc' })
export class Role extends BaseEntity {
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parent: Role;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'path',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  path: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  code: string;
}
