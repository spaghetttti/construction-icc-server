import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../materials/material.entity';
import { UpdateMaterialDto } from 'src/materials/dto/update-material.dto';
import { CreateMaterialDto } from 'src/materials/dto/create-material.dto';
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
    const {
      supplier: supplierId,
      name,
      quantity,
      costPerUnit,
      ...materialData
    } = createMaterialDto;

    // Check if material with the same name already exists
    const existingMaterial = await this.materialRepository.findOne({
      where: { name },
    });

    if (existingMaterial) {
      // Check if price differs
      if (existingMaterial.costPerUnit !== costPerUnit) {
        throw new ConflictException(
          `A material with the name "${name}" already exists but with a different price. Please rename the material or adjust the price.`,
        );
      }

      // Append quantity if the same material exists and the price matches
      existingMaterial.quantity += Number(quantity);

      // Update the existing material record with the new quantity
      return this.materialRepository.save(existingMaterial);
    }

    // Create a new material if none exists with the same name
    const newMaterial = this.materialRepository.create({
      ...materialData,
      name,
      quantity,
      costPerUnit,
    });

    // Associate supplier if provided
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

    // Save the new material in the repository
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
