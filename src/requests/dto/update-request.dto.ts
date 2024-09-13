import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { Material } from 'src/materials/material.entity';

export class UpdateRequestDto {
  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @IsArray()
  materials?: Material[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  teamSize?: number;
}
