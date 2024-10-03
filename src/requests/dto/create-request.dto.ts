import { IsString, IsNumber, IsArray } from 'class-validator';
export class CreateRequestDto {
  @IsNumber()
  projectId: number;

  @IsArray()
  materialIds: number[]; // Array of material IDs

  @IsString()
  status: string;

  @IsNumber()
  teamSize: number;
}
