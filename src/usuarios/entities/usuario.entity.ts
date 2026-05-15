import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecadosEntity } from '../../recados/entities/recados.entity';

@Entity()
export class UsuariosEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ length: 255 })
  senhaHash!: string;

  @Column({ length: 100 })
  nome!: string;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @OneToMany(() => RecadosEntity, (recado) => recado.from)
  recadosEnviados?: RecadosEntity[];

  @OneToMany(() => RecadosEntity, (recado) => recado.to)
  recadosRecebidos?: RecadosEntity[];
}
