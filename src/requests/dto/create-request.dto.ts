import { IsString, IsNumber, IsArray } from 'class-validator';
import { Material } from 'src/materials/material.entity';

export class CreateRequestDto {
  @IsNumber()
  projectId: number;

  @IsArray()
  materials: Material[]; // Array of material IDs

  @IsString()
  status: string;

  @IsNumber()
  teamSize: number;
}
