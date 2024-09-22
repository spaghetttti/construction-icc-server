import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.suppliersRepository.find();
  }

  async findOne(id: number): Promise<Supplier> {
    return this.suppliersRepository.findOneBy({ id });
  }

  async create(supplier: Partial<Supplier>): Promise<Supplier> {
    const newSupplier = this.suppliersRepository.create(supplier);
    return this.suppliersRepository.save(newSupplier);
  }

  async update(id: number, supplier: Partial<Supplier>): Promise<Supplier> {
    await this.suppliersRepository.update(id, supplier);
    return this.suppliersRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.suppliersRepository.delete(id);
  }
}
