import { IsNotEmpty, IsNumber } from 'class-validator';

export class MaterialQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  materialId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
