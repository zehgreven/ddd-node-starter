import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

const baseEntityColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uuid',
    isGenerated: true,
    isNullable: false,
    isPrimary: true,
    generationStrategy: 'uuid',
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
];

export { baseEntityColumns };
