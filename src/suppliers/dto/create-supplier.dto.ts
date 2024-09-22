import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  contactInfo: string[];

  @IsString()
  address: string;

  @IsString()
  @IsEmail()
  email: string;
}
