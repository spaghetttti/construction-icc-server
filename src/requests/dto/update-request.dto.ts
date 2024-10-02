import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateRequestDto {
  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @IsArray()
  materialIds?: number[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  teamSize?: number;
}
