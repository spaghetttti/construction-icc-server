import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Supplier } from './supplier.entity';

export const SuppliersFactory = setSeederFactory(Supplier, () => {
  const supplier = new Supplier();
  supplier.name = faker.internet.userName();
  supplier.contactInfo = [faker.phone.number(), faker.phone.number()];
  supplier.address = faker.location.streetAddress();
  supplier.email = faker.internet.email();

  return supplier;
});
