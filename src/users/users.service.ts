import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[] | undefined> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(
    username: string,
    password: string,
    role: Roles,
  ): Promise<User> {
    console.log(username, password, role);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.usersRepository.save(newUser);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(
    id: number,
    username: string,
    role: Roles,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ id });
    user.username = username;
    user.role = role;
    this.usersRepository.save(user);
    return;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
