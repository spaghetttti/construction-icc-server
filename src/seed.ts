import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from './users/user.entity';
import MainSeeder from './main.seeder';
import { Project } from './projects/project.entity';
import { Material } from './materials/material.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Accounting } from './accounting/accounting.entity';
import { UsersFactory } from './users/users.factory';
import { ProjectsFactory } from './projects/projcets.factory';
import { RequestsFactory } from './requests/requests.factory';
import { MaterialsFactory } from './materials/materials.factory';
import { SuppliersFactory } from './suppliers/suppliers.factory';
import { AccountingFactory } from './accounting/accounting.factory';
import { ReportsFactory } from './reports/reports.factory';

// const {
//   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
// } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'asilbekmuminov',
  password: 'azizbekloh',
  database: 'construction_db',
  entities: [User, Project, Request, Material, Supplier, Accounting, Report],
  factories: [
    UsersFactory,
    ProjectsFactory,
    RequestsFactory,
    MaterialsFactory,
    SuppliersFactory,
    AccountingFactory,
    ReportsFactory,
  ],
  seeds: [MainSeeder],
  synchronize: true,
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
