/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { isNotEmpty } from 'class-validator';

@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  birthDate: Date;

  @Column({ nullable: true })
  image: string;

  @Column()
  dni: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
