import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecadosEntity } from './entities/recados.entity';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadosEntity)
    private readonly recadosRepository: Repository<RecadosEntity>,
    private readonly usuariosService: UsuariosService,
  ) {}

  throwNotFoundError(id: number) {
    throw new NotFoundException(`Recado de ID: ${id} não encontrado.`);
  }

  async create(createRecadoDto: CreateRecadoDTO) {
    const { fromId, toId } = createRecadoDto;
    const from = await this.usuariosService.findOne(fromId);
    const to = await this.usuariosService.findOne(toId);
    const date = new Date();
    const updateAt = new Date();
    const read = false;

    const newRecado = {
      text: createRecadoDto.text,
      date,
      updateAt,
      from,
      to,
      read,
    };
    const recado = this.recadosRepository.create(newRecado);
    await this.recadosRepository.save(recado);
    return {
      ...recado,
      from: {
        id: recado.from.id,
      },
      to: {
        id: recado.to.id,
      },
    };
  }

  async findAll(pagination?: PaginationDTO) {
    const { limit = 10, offset = 0 } = pagination!;

    return await this.recadosRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: { id: 'desc' },
      select: { from: { id: true, nome: true }, to: { id: true, nome: true } },
    });
  }

  async findById(id: number) {
    const recado = await this.recadosRepository.findOne({
      where: { id: id },
      relations: ['from', 'to'],
      select: { from: { id: true, nome: true }, to: { id: true, nome: true } },
    });

    if (recado) {
      return recado;
    }
    return this.throwNotFoundError(id);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDTO) {
    const recado = await this.findById(id);

    if (recado) {
      recado.text = updateRecadoDto?.text ?? recado.text;
      recado.read = updateRecadoDto?.read ?? recado.read;
      await this.recadosRepository.save(recado);
      return recado;
    }
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOneBy({
      id,
    });
    if (!recado) return this.throwNotFoundError(id);

    return this.recadosRepository.remove(recado);
  }
}
