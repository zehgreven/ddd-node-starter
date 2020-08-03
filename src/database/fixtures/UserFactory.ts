import * as bcrypt from 'bcrypt';

import { User } from '../../Domain/User/User';

export class UserFactory {
  /**
   * @return {User[]}
   */
  public static fakeUsers(): User[] {
    const users = [];

    const user1 = User.register(
      'alex.clare@test.com',
      bcrypt.hashSync('testpass', bcrypt.genSaltSync(10)),
      'Alex',
      'Clare'
    );

    const user2 = User.register(
      'jack.green@test.com',
      bcrypt.hashSync('testpass', bcrypt.genSaltSync(10)),
      'Jack',
      'Green'
    );

    users.push(user1);
    users.push(user2);

    return users;
  }
}
