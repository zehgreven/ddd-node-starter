import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1596863703921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
