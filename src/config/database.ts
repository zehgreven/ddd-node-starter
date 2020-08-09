import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

import { Role } from '@src/Domain/Role/Role';

import { createUser1596863703921 } from '../database/migrations/1596863703921-create-user';
import { User } from '../Domain/User/User';

dotenv.load();

export function createConnectionOptions(): ConnectionOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Role],
    synchronize: true,
    logging: true,
    migrations: [createUser1596863703921],
  };
}
