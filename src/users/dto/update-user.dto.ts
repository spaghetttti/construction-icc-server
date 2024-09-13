import { IsOptional, IsString } from 'class-validator';
import { Roles } from '../user.interface';

export class updateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  role: Roles;
}
