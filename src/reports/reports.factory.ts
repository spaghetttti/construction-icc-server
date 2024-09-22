import { setSeederFactory } from 'typeorm-extension';
import { Report } from './report.entity';
import { faker } from '@faker-js/faker';

export const ReportsFactory = setSeederFactory(Report, () => {
  const report = new Report();
  report.dateOfTransaction = faker.date.recent();
  report.amount = faker.number.float();
  report.type = faker.helpers.arrayElement(['income', 'outcome']);
  report.description = faker.commerce.product();

  return report;
});
