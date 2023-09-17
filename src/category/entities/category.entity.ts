import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';

@Entity({ name: 'category' })
export class Category {
  constructor(
    liga: string,
    description: string,
    age_start: number,
    age_end: number,
    active: boolean,
    rol: Rol,
  ) {
    this.liga = liga;
    this.description = description;
    this.age_start = age_start;
    this.age_end = age_end;
    this.active = active;
    this.rol = rol;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  liga: string;

  @Column()
  description: string;

  @Column()
  age_start: number;

  @Column()
  age_end: number;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Rol, (rol) => rol.category)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
}
