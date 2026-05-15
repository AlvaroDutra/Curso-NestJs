/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepository: Repository<UsuariosEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const dadosNovoUsuario = {
        nome: createUsuarioDto.nome,
        senhaHash: createUsuarioDto.senha,
        email: createUsuarioDto.email,
      };
      const novoUsuario = this.usuariosRepository.create(dadosNovoUsuario);
      return await this.usuariosRepository.save(novoUsuario);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já cadastrado.');
      }
      throw error;
    }
  }

  async findAll() {
    const usuarios = await this.usuariosRepository.find({
      order: {
        id: 'desc',
      },
    });
    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuariosRepository.findOneBy({
      id,
    });

    if (!usuario)
      throw new NotFoundException(`Usuário de ID: ${id} não encontrado`);

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const dadosUsuario = {
      senhaHash: updateUsuarioDto.senha,
      nome: updateUsuarioDto.nome,
    };
    const usuario = await this.usuariosRepository.preload({
      id,
      ...dadosUsuario,
    });
    if (!usuario)
      throw new NotFoundException(`Usuário de ID: ${id} não encontrado`);

    return this.usuariosRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuariosRepository.findOneBy({
      id,
    });

    if (!usuario)
      throw new NotFoundException(`Usuário de ID: ${id} não encontrado`);

    return this.usuariosRepository.remove(usuario);
  }
}
