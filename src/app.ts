import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as validate from 'express-validation';
import * as helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as path from 'path';
import { createConnection } from 'typeorm';

import { createConnectionOptions } from './config/database';
import container from './config/inversify.config';
import { AccessDeniedError } from './Domain/Core/AccessDeniedError';
import { EntityNotFound } from './Domain/Core/EntityNotFound';
import { jsonMiddleware, loggerMiddleware } from './Http/Middleware/CustomMiddleware';

createConnection(createConnectionOptions())
  .then(async (connection) => {
    const port: number = parseInt(process.env.PORT);

    const server = new InversifyExpressServer(container, null, { rootPath: '/api/v1' });

    server.setConfig((app) => {
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use('/uploads', express.static(path.resolve('./public/uploads')));
      app.use(jsonMiddleware, loggerMiddleware);
      app.use(helmet());
    });

    server.setErrorConfig((app) => {
      app.use((err, req, res, next) => {
        if (err instanceof validate.ValidationError) {
          err.status = 422;
          res.status(err.status).json({ errorMessage: 'Validation error.', error: err });
          return;
        }

        if (err instanceof EntityNotFound) {
          res.status(404).send({ errorMessage: err.message });
          return;
        }

        if (err instanceof AccessDeniedError) {
          res.status(403).send({ errorMessage: err.message });
          return;
        }

        if (err instanceof Error) {
          console.error(err.stack);
          res.status(400).send({ errorMessage: err.message });
          return;
        }

        res.status(500).send(err.stack);

        // TODO: uncomment when production
        // res.status(500).send('Something broke!');
      });
    });

    server.build().listen(port, '0.0.0.0', function () {
      console.log(`listening on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));

process.on('unhandledRejection', (error: any) => {
  console.log('unhandledRejection', error.message);
});
