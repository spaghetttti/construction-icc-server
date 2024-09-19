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

  @Column('decimal')
  amount: number; // Amount of the transaction

  @Column()
  type: 'income' | 'outcome'; // Transaction type (income or outcome)

  @Column()
  description: string; // Description of the transaction

  @ManyToOne(() => Accounting, (accounting) => accounting, {
    onDelete: 'CASCADE',
  })
  accounting: Accounting; // Reference to the accounting (bank)

  @ManyToOne(() => Project, { nullable: true }) // Optional project reference
  project?: Project;

  @ManyToOne(() => Material, { nullable: true }) // Optional material reference
  material?: Material;

  @ManyToOne(() => User) // Reference to the person involved in the transaction
  person: User; // User who performed the transaction (like Foreman, Manager, etc.)
}
