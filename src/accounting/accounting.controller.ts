import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { Report } from '../reports/report.entity';

@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get()
  getAccounting() {
    return this.accountingService.getAccounting();
  }

  @Post('transaction')
  createTransaction(@Body() reportData: Partial<Report>) {
    return this.accountingService.createTransaction(reportData);
  }
}
