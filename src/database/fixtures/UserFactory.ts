import * as bcrypt from 'bcrypt';

import { User } from '../../Domain/User/User';

export class UserFactory {
  /**
   * @return {User[]}
   */
  public static fakeUsers(): User[] {
    const users = [];

    const user1 = User.register('admin@admin.com', bcrypt.hashSync('Qwe123@', bcrypt.genSaltSync(10)));

    users.push(user1);

    return users;
  }
}
