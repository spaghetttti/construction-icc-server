import { IsString } from 'class-validator';
import { Roles } from '../user.interface';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  role: Roles;
}
