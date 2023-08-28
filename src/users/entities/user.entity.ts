/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable prettier/prettier */
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: typeof v4;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  // @DeleteDateColumn()
  // deletedAt: Date           //! PARA BORRADO LOGICO
  @Column({ nullable: true })
  authStrategy: string;
  @Column()
  active: boolean;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
