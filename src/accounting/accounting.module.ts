import { Module } from '@nestjs/common';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounting } from './accounting.entity';
import { Report } from 'src/reports/report.entity';
import { Material } from 'src/materials/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounting, Report, Material])],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
