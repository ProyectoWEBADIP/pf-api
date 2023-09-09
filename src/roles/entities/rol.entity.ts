import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1 })
  genero: string;

  @Column({ unique: true, length: 50 })
  category: string;

  @Column({ unique: true, length: 50 })
  subCategory: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
