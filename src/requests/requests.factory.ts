import { setSeederFactory } from 'typeorm-extension';
import { Request } from './requests.entity';
import { faker } from '@faker-js/faker';

export const RequestsFactory = setSeederFactory(Request, () => {
  const request = new Request();
  request.status = faker.helpers.arrayElement([
    'Pending',
    'Approved',
    'Rejected',
  ]);
  request.teamSize = faker.number.int();

  return request;
});
