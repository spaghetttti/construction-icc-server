import { setSeederFactory } from 'typeorm-extension';
import { Material } from './material.entity';
import { faker } from '@faker-js/faker';

export const MaterialsFactory = setSeederFactory(Material, () => {
  const material = new Material();
  material.name = faker.vehicle.vehicle();
  material.quantity = faker.number.int();
  material.type = faker.string.alphanumeric();
  material.unit = 'shtuka';
  material.costPerUnit = 340;
  material.supplier = null;
  return material;
});
