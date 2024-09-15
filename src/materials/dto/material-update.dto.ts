import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  supplier: string; // Optional: supplier for this material
}
