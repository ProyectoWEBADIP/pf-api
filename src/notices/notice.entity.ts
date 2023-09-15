import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/categorie.entity';
import { Comments } from 'src/comments/entities/comments.entity';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
@Entity({ name: 'notices' })
export class Notice {
  constructor(
    title: string,
    content: string,
    image: string,
    resume: string,
    categories: Category[],
    user: User,
  ) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.resume = resume;
    this.categories = categories; // Asigna el array de categorías
    this.user = user; // Asigna el usuario
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar' })
  resume: string;

  @Column({ default: true })
  active: boolean;
  //Noticias
  @ManyToOne(() => User, (user) => user.notice)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, (category) => category.notices, { cascade: true })
  @JoinTable({ name: 'notice_categories' })
  categories: Category[];

  @ManyToMany(() => Comments, (comments) => comments.notice)
  @JoinTable({ name: 'notice_comments' })
  comments: Comments[];
}
