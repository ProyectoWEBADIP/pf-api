import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Rol } from 'src/roles/entities/rol.entity';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Rol, (rol) => rol.notification)
  rol: Rol[];
}
