import { setSeederFactory } from 'typeorm-extension';
import { Accounting } from './accounting.entity';

export const AccountingFactory = setSeederFactory(Accounting, () => {
  const accounting = new Accounting();
  accounting.balance = 10000;
  return accounting;
});
