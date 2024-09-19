import { setSeederFactory } from 'typeorm-extension';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';
import { Roles } from './user.interface';

const roles: Roles[] = [
  'warehouse_manager',
  'foreman',
  'manager',
  'administrator',
  'accountant',
  'simple_user',
];

export const UsersFactory = setSeederFactory(User, () => {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.role = faker.helpers.arrayElement(roles);
  return user;
});
