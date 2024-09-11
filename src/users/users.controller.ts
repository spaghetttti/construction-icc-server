import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  create(
    @Body() createUserDto: { username: string; password: string; role: Roles },
  ) {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: { username: string; role: Roles },
  ) {
    return this.usersService.updateUser(
      id,
      updateUserDto.username,
      updateUserDto.role,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
