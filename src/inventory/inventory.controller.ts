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
import { CreateMaterialDto } from 'src/materials/dto/material-create.dto';
import { UpdateMaterialDto } from 'src/materials/dto/material-update.dto';

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
    createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    return this.inventoryService.createMaterial(createMaterialDto);
  }

  @Put('materials/:id')
  updateMaterial(
    @Param('id') id: number,
    @Body() updateData: UpdateMaterialDto,
  ): Promise<Material> {
    return this.inventoryService.updateMaterial(id, updateData);
  }

  @Delete('materials/:id')
  deleteMaterial(@Param('id') id: number): Promise<void> {
    return this.inventoryService.deleteMaterial(id);
  }
}
