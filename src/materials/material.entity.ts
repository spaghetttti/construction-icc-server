import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  type: string;

  @Column()
  unit: string; // E.g., kilograms, meters, etc.

  @Column('decimal')
  costPerUnit: number;

  @Column({ nullable: true })
  supplier: string; // Optional: supplier for this material
}
