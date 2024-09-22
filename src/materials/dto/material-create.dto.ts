import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Supplier } from 'src/suppliers/supplier.entity';

export class MaterialCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  type: string;

  @IsString()
  unit: string; // E.g., kilograms, meters, etc.

  @IsNumber()
  costPerUnit: number;

  @IsOptional()
  // @IsString()
  supplier: Supplier; // Optional: supplier for this material
}
