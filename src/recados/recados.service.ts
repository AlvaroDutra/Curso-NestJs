import { Injectable, NotFoundException } from '@nestjs/common';
import { RecadosEntity } from './entities/recados.entity';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { CreateRecadoDTO } from './dtos/create-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: RecadosEntity[] = [
    {
      id: 1,
      text: 'Recado de teste',
      from: 'Sistema',
      for: 'Usuário',
      read: false,
      date: new Date(),
    },
  ];

  throwNotFoundError(id: number) {
    throw new NotFoundException(`Recado de ID: ${id} não encontrado.`);
  }

  findAll() {
    return this.recados;
  }

  findById(id: number) {
    const recado = this.recados.find((recado) => recado.id == id);
    if (recado) {
      return recado;
    }
    this.throwNotFoundError(id);
  }

  create(createRecadoDto: CreateRecadoDTO) {
    this.lastId++;
    const id = this.lastId;
    const date = new Date();
    const read = false;

    const newRecado = {
      id,
      ...createRecadoDto,
      read,
      date,
    };
    this.recados.push(newRecado);

    return {
      message: 'Novo recado criado com sucesso!',
      new_recado: newRecado,
    };
  }

  update(id: number, updateRecadoDto: UpdateRecadoDTO) {
    const recadoExistenteIndex = this.recados.findIndex(
      (recado) => recado.id === id,
    );

    if (recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];

      this.recados[recadoExistenteIndex] = {
        ...recadoExistente,
        ...updateRecadoDto,
      };
      return {
        message: `Recado de ID: ${id} foi atualizado com sucesso!`,
        patch: updateRecadoDto,
      };
    }
    this.throwNotFoundError(id);
  }

  remove(id: number) {
    const recadoExistenteIndex = this.recados.findIndex(
      (recado) => recado.id === id,
    );

    if (recadoExistenteIndex >= 0) {
      this.recados.slice(recadoExistenteIndex, 1);
      return { message: `Recado de ID: ${id} foi removido com sucesso!` };
    }
    this.throwNotFoundError(id);
  }
}
