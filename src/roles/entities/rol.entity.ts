import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity({ name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => User, (user) => user.rol)
  user: User;

  @OneToMany(() => Category, (category) => category.rol)
  category: Category[];

  @ManyToMany(() => Notification, (notification) => notification.rol)
  @JoinTable({
    name: 'rol_notification',
    joinColumn: { name: 'rol_id' },
    inverseJoinColumn: { name: 'notification_id' },
  })
  notification: Notification[];
}
