import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsuariosEntity } from '../../usuarios/entities/usuario.entity';

@Entity()
export class RecadosEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  text!: string;

  @ManyToOne(() => UsuariosEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'from' })
  from!: UsuariosEntity;

  @ManyToOne(() => UsuariosEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'to' })
  to!: UsuariosEntity;

  @Column({ default: false })
  read!: boolean;

  @CreateDateColumn()
  date!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
