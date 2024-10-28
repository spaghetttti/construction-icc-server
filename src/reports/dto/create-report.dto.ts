import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialQuantityDto } from 'src/requests/dto/materials-list.dto';

export class CreateReportDto {
  @IsNotEmpty()
  @Type(() => Date)
  dateOfTransaction: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(['income', 'outcome'], {
    message: 'Type must be either income or outcome',
  })
  type: 'income' | 'outcome';

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  accountingId: number;

  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MaterialQuantityDto)
  materials: MaterialQuantityDto[]; // Array of materials with their quantities

  @IsOptional()
  person: number | string;

  // @IsOptional()
  // externalPerson: string;
}
