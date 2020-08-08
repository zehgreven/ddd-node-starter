import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { baseEntityColumns } from '../Constants';

export class createUser1596863703921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('acc');

    await queryRunner.createTable(
      new Table({
        name: 'acc.user',
        columns: [
          ...baseEntityColumns,
          {
            name: 'login',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '60',
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.query(
      'CREATE UNIQUE INDEX uq_login ON acc.user (login, (deleted_at IS NULL)) WHERE deleted_at IS NULL;'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('acc.user', true);
    await queryRunner.dropSchema('acc');
  }
}
