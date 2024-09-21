import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { Accounting } from './accounting/accounting.entity';
import { Report } from './reports/report.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Project,
          Request,
          Material,
          Supplier,
          Accounting,
          Report,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
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
