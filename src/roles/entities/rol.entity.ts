import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  rol: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
