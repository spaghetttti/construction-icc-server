import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { MaterialQuantityDto } from './materials-list.dto';

export class UpdateRequestDto {
  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialQuantityDto)
  materials: MaterialQuantityDto[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  teamSize?: number;
}
