import { Supplier } from 'src/suppliers/supplier.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Supplier, { nullable: true })
  supplier: Supplier; // Optional: supplier for this material
}
