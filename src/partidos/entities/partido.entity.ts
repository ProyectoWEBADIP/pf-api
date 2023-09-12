/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'varchar', length: 100 })
  equipoLocal: string;

  @Column({ type: 'varchar', length: 100 })
  equipoVisitante: string;

  @Column({ type: 'int' })
  golesLocal: number;

  @Column({ type: 'int' })
  golesVisitante: number;

  @Column({ type: 'varchar', length: 50 })
  resultado: string;

  @Column({ type: 'int' })
  jornada: number;

  @Column({ type: 'int' })
  temporada: number;

  @Column({ type: 'varchar', length: 50 })
  competicion: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'varchar', length: 10 })
  fechaActualizacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ type: 'varchar', length: 100 })
  usuarioCreacion: string;

  @Column({ type: 'varchar', length: 100 })
  usuarioActualizacion: string;
}
