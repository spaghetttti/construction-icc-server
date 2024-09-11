import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Roles, User as UserInterface } from './user.interface';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: Roles;
}
