import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Min, Max } from 'class-validator';

@Entity({ name: 'sponsors' })
export class Sponsor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  image: string;

  @Column()
  active: boolean;

  @Column('int')
  @Min(0, { message: 'La ubicación debe ser al menos 0' })
  @Max(20, { message: 'La ubicación debe ser máximo 20' })
  location: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
