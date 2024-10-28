import { Accounting } from 'src/accounting/accounting.entity';
import { Material } from 'src/materials/material.entity';
import { Project } from 'src/projects/project.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateOfTransaction: Date;

  @Column()
  amount: number;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  description: string;

  @ManyToOne(() => Accounting, (accounting) => accounting.reports, {
    onDelete: 'CASCADE',
  })
  accounting: Accounting; // Reference to the accounting (bank)

  @ManyToOne(() => Project, { nullable: true }) // Optional project reference
  project?: Project;

  @ManyToOne(() => Material, { nullable: true }) // Optional material reference
  material?: Material; // might have to change this

  @ManyToOne(() => User)
  person: User;

  @Column({ nullable: true })
  externalPerson?: string;
}
