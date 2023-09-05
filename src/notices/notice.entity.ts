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

@Entity({ name: 'notices' })
export class Notice {
  constructor(
    title: string,
    content: string,
    image: string,
    resume: string,
    user: User,
    categorie: Category,
  ) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.resume = resume;
    this.user = user;
    this.categorie = categorie;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'text'})
  content: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'varchar'})
  resume: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.notice)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, (category) => category.notices, { cascade: true })
  @JoinColumn({ name: 'categorie_id' })
  categorie: Category;

  @ManyToMany(() => Comments, (comments) => comments.notice)
  @JoinTable({ name: 'notice_comments' })
  comments: Comments[];
}
