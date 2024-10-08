import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
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
  supplier: number; // Optional: supplier for this material
}
