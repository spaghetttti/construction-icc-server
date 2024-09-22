import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Supplier } from 'src/suppliers/supplier.entity';

export class MaterialUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  unit: string; // E.g., kilograms, meters, etc.

  @IsOptional()
  @IsNumber()
  costPerUnit: number;

  @IsOptional()
  // @IsString()
  supplier: Supplier; // Optional: supplier for this material
}
