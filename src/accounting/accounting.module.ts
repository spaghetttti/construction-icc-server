import { Module } from '@nestjs/common';
import { AccountingController } from './accounting.controller';
import { AccountingService } from './accounting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounting } from './accounting.entity';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounting, Report, Project, User])],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
