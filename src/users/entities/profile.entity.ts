/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profile')
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  birthDate: Date;
  @Column({nullable:true})
  image: string;
  @Column()
  dni: string
}
