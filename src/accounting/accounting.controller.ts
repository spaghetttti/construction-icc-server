import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { CreateReportDto } from 'src/reports/dto/create-report.dto';

@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get()
  getAccounting() {
    return this.accountingService.getAccounting();
  }

  @Post('transaction')
  createTransaction(@Body() reportData: CreateReportDto) {
    return this.accountingService.createReport(reportData);
  }
}
