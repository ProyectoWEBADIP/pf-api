/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'partidos' })
export class Partido {
  constructor(
    title: string,
    category_name: string,
    competence: string,
    Local_shield: string,
    visitor_shield: string,
    date: string,
    location: string,
    description: string,
    home_goals: string,
    visitor_goals: string,
    user: User,
  ) {
    this.title = title;
    this.category_name = category_name;
    this.competence = competence;
    this.Local_shield = Local_shield;
    this.visitor_shield = visitor_shield;
    this.date = date;
    this.location = location;
    this.description = description;
    this.home_goals = home_goals;
    this.visitor_goals = visitor_goals;
    this.user = user;
  }
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

  @Column({ type: 'varchar', length: 100 })
  date: string;

  @Column({ type: 'varchar', length: 500 })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  home_goals: string;

  @Column()
  visitor_goals: string;

  @ManyToOne(() => User, (user) => user.partido)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
