import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { MaterialQuantityDto } from './materials-list.dto';
export class CreateRequestDto {
  @IsNumber()
  projectId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialQuantityDto)
  materials: MaterialQuantityDto[];

  @IsString()
  status: string;

  @IsNumber()
  teamSize: number;
}
