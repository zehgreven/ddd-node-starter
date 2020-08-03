import * as express from 'express';

import { User } from '../../Domain/User/User';

export interface IRequest extends express.Request {
  user?: User;
  file?: any;
}
