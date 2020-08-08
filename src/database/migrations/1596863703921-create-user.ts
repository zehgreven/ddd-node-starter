import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1596863703921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('acc');

    await queryRunner.createTable(
      new Table({
        name: 'acc.user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isGenerated: true,
            isNullable: false,
            isPrimary: true,
            generationStrategy: 'uuid',
          },
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
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            onUpdate: 'NOW()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
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
