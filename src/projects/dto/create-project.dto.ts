import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsOptional()
  // @IsString()
  assignedForeman?: number; // nullable field
}
