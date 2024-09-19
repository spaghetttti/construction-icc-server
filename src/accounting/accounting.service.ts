import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounting } from './accounting.entity';
import { Report } from '../reports/report.entity';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(Accounting)
    private accountingRepository: Repository<Accounting>,

    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async checkIfMainAccountExists(): Promise<void> {
    const count = await this.accountingRepository.count();
    if (count > 0) {
      throw new BadRequestException(
        'Main accounting already exists. You cannot create another one.',
      );
    }
  }

  async createMainAccount(
    accountingData: Partial<Accounting>,
  ): Promise<Accounting> {
    await this.checkIfMainAccountExists();

    const newAccount = this.accountingRepository.create(accountingData);
    return this.accountingRepository.save(newAccount);
  }

  async getAccounting(): Promise<Accounting> {
    return this.accountingRepository.findOne({
      where: { id: 1 },
      relations: ['reports'],
    });
  }

  async createTransaction(reportData: Partial<Report>): Promise<Report> {
    const accounting = await this.accountingRepository.findOne({
      where: { id: 1 },
      relations: ['reports'],
    });
    const newReport = this.reportsRepository.create(reportData);

    // Update balance
    if (newReport.type === 'income') {
      accounting.balance += Number(newReport.amount);
    } else if (newReport.type === 'outcome') {
      accounting.balance -= Number(newReport.amount);
    }

    // Save transaction and update accounting
    await this.reportsRepository.save(newReport);
    await this.accountingRepository.save(accounting);

    return newReport;
  }
}
