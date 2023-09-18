import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'sponsors' })
export class Sponsor {
  constructor(
    title: string,
    image: string,
    active: boolean,
    location: number,
    user: User,
  ) {
    this.title = title;
    this.image = image;
    this.active = active;
    this.location = location;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  active: boolean;

  @Column()
  location: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sponsor)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
