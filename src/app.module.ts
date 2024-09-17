import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InventoryModule } from './inventory/inventory.module';
import { ProjectsModule } from './projects/projects.module';
import { RequestsModule } from './requests/requests.module';
import { MaterialsModule } from './materials/materials.module';
import { AccountingModule } from './accounting/accounting.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Request } from './requests/requests.entity';
import { Material } from './materials/material.entity';
import { Supplier } from './suppliers/supplier.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'asilbekmuminov',
      password: 'azizbekloh',
      database: 'construction_db',
      entities: [User, Project, Request, Material, Supplier],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    InventoryModule,
    ProjectsModule,
    RequestsModule,
    MaterialsModule,
    AccountingModule,
    SuppliersModule,
    ReportsModule,
  ],
})
export class AppModule {}
