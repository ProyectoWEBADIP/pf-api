/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from 'src/categories/entities/categorie.entity';
import { Comments } from 'src/comments/entities/comments.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notices' })
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'varchar', length: 250, unique: true })
  content: string;

  @Column()
  image: string;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'varchar', length: 125, unique: true })
  resume: string;

  @ManyToOne(() => User, (user) => user.notice)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.notice)
  @JoinColumn({ name: 'categorie_id' })
  categorie: Category[];

  @ManyToMany(() => Comments, (comments) => comments.notice)
  @JoinColumn({ name: 'comments_id' })
  comments: Comments[];
}
