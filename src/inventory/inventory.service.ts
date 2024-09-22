import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../materials/material.entity';
import { Supplier } from 'src/suppliers/supplier.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async createMaterial(
    name: string,
    quantity: number,
    unit: string,
    costPerUnit: number,
    type: string,
    supplier?: Supplier,
  ): Promise<Material> {
    const newMaterial = this.materialRepository.create({
      name,
      quantity,
      unit,
      costPerUnit,
      type,
      supplier,
    });
    return this.materialRepository.save(newMaterial);
  }

  // Retrieve all materials
  async getAllMaterials(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  // Retrieve a material by ID
  async getMaterialById(id: number): Promise<Material> {
    return this.materialRepository.findOneBy({ id });
  }

  // Update a material
  async updateMaterial(
    id: number,
    updateData: Partial<Material>,
  ): Promise<Material> {
    await this.materialRepository.update(id, updateData);
    return this.materialRepository.findOneBy({ id });
  }

  // Delete a material
  async deleteMaterial(id: number): Promise<void> {
    await this.materialRepository.delete(id);
  }
}
