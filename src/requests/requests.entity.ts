import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  // JoinColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { RequestMaterial } from './request-material.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { nullable: false, onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(
    () => RequestMaterial,
    (requestMaterial) => requestMaterial.request,
    { cascade: true },
  )
  requestMaterials: RequestMaterial[]; // Array of RequestMaterial entities storing material and quantity

  @Column()
  status: string; // E.g., "Pending", "Approved", "Rejected"

  @Column()
  teamSize: number; // Number of team members requested by the Foreman
}
