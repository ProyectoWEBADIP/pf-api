import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'subCategory' })
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  subCategory: string;

  @Column({ unique: true, length: 2000 })
  description: string;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
