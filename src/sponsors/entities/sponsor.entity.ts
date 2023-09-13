import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sponsors' })
export class Sponsor {
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
}
