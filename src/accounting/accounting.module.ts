import { Module } from '@nestjs/common';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounting } from './accounting.entity';
import { Report } from 'src/reports/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounting, Report])],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
