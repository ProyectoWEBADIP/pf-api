import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'pagos' })
export class Pago {
  constructor(cuota: number, estado: boolean, comprobante: string, user: User) {
    this.cuota = cuota;
    this.estado = estado;
    this.comprobante = comprobante;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cuota: number;

  @Column()
  estado: boolean;

  @Column()
  comprobante: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.pagos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
