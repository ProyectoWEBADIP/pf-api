import {
  Column,
  CreateDateColumn,
  Entity,
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
}
