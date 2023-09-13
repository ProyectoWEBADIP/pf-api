/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'partidos' })
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 50 })
  category_name: string;

  @Column({ type: 'varchar', length: 50 })
  competence: string;

  @Column({ type: 'varchar', length: 200 })
  Local_shield: string;

  @Column({ type: 'varchar', length: 200 })
  visitor_shield: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 500 })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  home_goals: number;

  @Column({ type: 'int' })
  visitor_goals: number;
}
