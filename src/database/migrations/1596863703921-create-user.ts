import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

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

    await queryRunner.createUniqueConstraint(
      'user',
      new TableUnique({
        name: 'uq_login',
        columnNames: ['login'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('user', 'uq_login');
    await queryRunner.dropTable('users', true);
  }
}
