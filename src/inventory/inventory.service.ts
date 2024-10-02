import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../materials/material.entity';
import { UpdateMaterialDto } from 'src/materials/dto/material-update.dto';
import { CreateMaterialDto } from 'src/materials/dto/material-create.dto';
import { Supplier } from 'src/suppliers/supplier.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  // Retrieve all materials
  async getAllMaterials(): Promise<Material[]> {
    return this.materialRepository.find({ relations: ['supplier'] });
  }

  // Retrieve a material by ID
  async getMaterialById(id: number): Promise<Material> {
    return this.materialRepository.findOne({
      where: { id },
      relations: ['supplier'],
    });
  }

  async createMaterial(
    createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    const { supplier: supplierId, ...materialData } = createMaterialDto;

    const newMaterial = this.materialRepository.create(materialData);

    // If a supplierId is provided, find the supplier and associate it with the material
    if (supplierId && supplierId != -1) {
      const supplier = await this.supplierRepository.findOneBy({
        id: supplierId,
      });
      if (!supplier) {
        throw new NotFoundException(
          `Supplier with ID ${supplierId} not found.`,
        );
      }
      newMaterial.supplier = supplier;
    } else {
      newMaterial.supplier = null;
    }

    return this.materialRepository.save(newMaterial);
  }

  // Update a material
  async updateMaterial(
    id: number,
    updateData: UpdateMaterialDto,
  ): Promise<Material> {
    const { supplier: supplierId, ...materialData } = updateData;

    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['supplier'],
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found.`);
    }

    // Update material details
    Object.assign(material, materialData);

    // Handle supplier update: set to null if supplierId is -1
    if (supplierId && supplierId != -1) {
      const supplier = await this.supplierRepository.findOneBy({
        id: supplierId,
      });
      if (!supplier) {
        throw new NotFoundException(
          `Supplier with ID ${supplierId} not found.`,
        );
      }
      material.supplier = supplier;
    } else {
      material.supplier = null;
    }

    return this.materialRepository.save(material);
  }

  async deleteMaterial(id: number): Promise<void> {
    const material = await this.materialRepository.findOneBy({ id });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found.`);
    }

    await this.materialRepository.delete(id);
  }
}
