/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Notice } from 'src/notices/notice.entity';
import { Comments } from 'src/comments/entities/comments.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date; //! PARA BORRADO LOGICO

  @Column({ nullable: true })
  authStrategy: string;

  @Column({ nullable: true })
  active: boolean;

  @Column({ default: 'admin' })
  role: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Notice, (notice) => notice.user)
  notice: Notice[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];
}
