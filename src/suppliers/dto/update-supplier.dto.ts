import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSupplierDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  contactInfo: string[];

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}
