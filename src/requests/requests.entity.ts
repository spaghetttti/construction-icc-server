import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { Material } from '../materials/material.entity'; // Materials

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { nullable: false })
  project: Project;

  @ManyToMany(() => Material) // Many materials can be requested in one request
  @JoinTable() // Creates the join table to store the many-to-many relationship
  materials: Material[]; // List of requested materials (foreign key)

  @Column()
  status: string; // E.g., "Pending", "Approved", "Rejected"

  @Column()
  teamSize: number; // Number of team members requested by the Foreman
}
