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
import { Role } from '../../common/enums/roles.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date; //! PARA BORRADO LOGICO

  @Column({ nullable: true })
  authStrategy: string;

  @Column({ default: false, nullable: true })
  
  active: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Notice, (notice) => notice.user)
  notice: Notice[];

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];
}
