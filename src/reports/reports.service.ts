import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async findAll(): Promise<Report[]> {
    return this.reportsRepository.find({
      relations: ['accounting', 'project', 'material', 'person'],
    });
  }

  async findOne(id: number): Promise<Report> {
    return this.reportsRepository.findOne({
      where: { id: id },
      relations: ['accounting', 'project', 'material', 'person'],
    });
  }
}
