import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounting } from './accounting.entity';
import { Report } from '../reports/report.entity';
import { CreateReportDto } from 'src/reports/dto/create-report.dto';
import { Material } from 'src/materials/material.entity';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(Accounting)
    private accountingRepository: Repository<Accounting>,

    @InjectRepository(Material)
    private readonly materialsRepository: Repository<Material>,

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

  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    const { type, amount, description, materials, dateOfTransaction } =
      createReportDto;

    const accounting = await this.getAccounting();

    if (!accounting) {
      throw new Error('Accounting record not found');
    }

    const report = this.reportsRepository.create({
      type,
      amount,
      description,
      dateOfTransaction,
      accounting,
    });

    await this.reportsRepository.save(report);

    if (materials) {
      for (const materialDto of materials) {
        const { materialId, quantity } = materialDto;

        let inventoryMaterial = await this.materialsRepository.findOne({
          where: { id: materialId },
        });
        //! change this logic to create a new matrial type tie it up with inventory.service.createMaterial()
        if (!inventoryMaterial) {
          inventoryMaterial = this.materialsRepository.create({
            id: Number(materialId),
            quantity: 0,
          });
        }

        if (type === 'income') {
          inventoryMaterial.quantity += quantity;
        } else if (type === 'outcome') {
          if (inventoryMaterial.quantity < quantity) {
            throw new BadRequestException(
              `Not enough stock for material with ID ${materialId}`,
            );
          }
          inventoryMaterial.quantity -= quantity;
        }

        await this.materialsRepository.save(inventoryMaterial);
      }
    }

    if (type === 'income') {
      accounting.balance += amount;
    } else if (type === 'outcome') {
      if (accounting.balance < amount) {
        throw new BadRequestException('Not enough balance for this outcome');
      }
      accounting.balance -= amount;
    }

    await this.accountingRepository.save(accounting);

    return report;
  }
}
