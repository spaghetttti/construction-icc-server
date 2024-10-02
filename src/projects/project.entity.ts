import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'; // Assuming User is the entity for all users

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  status: string; // E.g., "Not Started", "In Progress", "Completed"

  @ManyToOne(() => User, (user) => user, { nullable: true })
  assignedForeman: User | null; // Foreman who is responsible for the project (nullable)
}
