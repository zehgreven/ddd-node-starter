import { createConnection, MigrationInterface } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';

import { createConnectionOptions } from '../config/database';
import { UserFactory } from '../database/fixtures/UserFactory';
import { User } from '../Domain/User/User';

export const environment = {
  baseUrl: 'http://localhost:3123',
  apiVersion: '/api/v1',
  login: 'admin@admin.com',
  password: 'Qwe123@',
  users: [],
};

const getConnection: Promise<Connection> = createConnection(createConnectionOptions());

// Down and Up migrations with fixtures
export function rollbackMigrations(done) {
  getConnection.then((connection) => {
    connection.migrations.forEach((migration: MigrationInterface) => {
      migration.down(connection.createQueryRunner()).then(() => {
        migration.up(connection.createQueryRunner()).then(() => {
          connection.manager.save(UserFactory.fakeUsers()).then((users: User[]) => {
            environment.users = users;
            done();
          });
        });
      });
    });
  });
}
