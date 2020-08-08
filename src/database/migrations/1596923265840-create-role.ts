import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { baseEntityColumns } from '../Constants';

export class createRole1596923265840 implements MigrationInterface {
  ROLE_TABLE = 'acc.role';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.ROLE_TABLE,
        columns: [
          ...baseEntityColumns,
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'path',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX uq_role_name ON ${this.ROLE_TABLE} (name, (deleted_at IS NULL)) WHERE deleted_at IS NULL;`
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX uq_role_code ON ${this.ROLE_TABLE} (code, (deleted_at IS NULL)) WHERE deleted_at IS NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.ROLE_TABLE);
  }
}
