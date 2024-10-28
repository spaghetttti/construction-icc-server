import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Request } from './requests.entity';
import { Material } from 'src/materials/material.entity';

@Entity()
export class RequestMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Request, (request) => request.requestMaterials, {
    onDelete: 'CASCADE',
  })
  request: Request;

  @ManyToOne(() => Material, { eager: true })
  material: Material;

  @Column()
  quantity: number; // Stores the quantity of the material for this specific request
}
