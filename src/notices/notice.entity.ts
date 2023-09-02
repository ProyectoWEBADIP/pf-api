import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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

  @ManyToOne(() => Category, (category) => category.notice, { cascade: true }) // Agregamos cascade: true para que al guardar una noticia, también se guarde la categoría si aún no existe
  @JoinColumn({ name: 'categorie_id' })
  categorie: Category;

  @ManyToMany(() => Comments, (comments) => comments.notice)
  @JoinTable({ name: 'notice_comments' }) // Nombre de la tabla de relación entre Noticia y Comentarios
  comments: Comments[];

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
    this.categorie = categorie; // Asignamos la categoría proporcionada al campo 'categorie'
  }
}
