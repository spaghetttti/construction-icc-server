import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Material } from '../materials/material.entity';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Material]), SuppliersModule],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [TypeOrmModule],
})
export class InventoryModule {}
