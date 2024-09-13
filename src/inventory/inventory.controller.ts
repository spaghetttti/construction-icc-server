import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Material } from '../materials/material.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('materials')
  getAllMaterials(): Promise<Material[]> {
    return this.inventoryService.getAllMaterials();
  }

  @Get('materials/:id')
  getMaterialById(@Param('id') id: number): Promise<Material> {
    return this.inventoryService.getMaterialById(id);
  }

  @Post('materials')
  createMaterial(
    @Body()
    body: {
      name: string;
      quantity: number;
      unit: string;
      costPerUnit: number;
      type: string;
      supplier?: string;
    },
  ): Promise<Material> {
    const { name, quantity, unit, costPerUnit, type, supplier } = body;
    return this.inventoryService.createMaterial(
      name,
      quantity,
      unit,
      costPerUnit,
      type,
      supplier,
    );
  }

  @Put('materials/:id')
  updateMaterial(
    @Param('id') id: number,
    @Body() updateData: Partial<Material>,
  ): Promise<Material> {
    return this.inventoryService.updateMaterial(id, updateData);
  }

  @Delete('materials/:id')
  deleteMaterial(@Param('id') id: number): Promise<void> {
    return this.inventoryService.deleteMaterial(id);
  }
}
