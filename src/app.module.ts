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
      useFactory: (config: ConfigService) => {
        console.log(config.get<string>('NODE_ENV'));

        const isProduction = config.get<string>('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: isProduction
            ? config.get<string>('DATABASE_URL_PRODUCTION')
            : config.get<string>('DATABASE_URL_LOCAL'),
          ssl: isProduction ? { rejectUnauthorized: false } : false, // SSL for production
          entities: [
            User,
            Project,
            Request,
            Material,
            Supplier,
            Accounting,
            Report,
          ],
        };
      },
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
