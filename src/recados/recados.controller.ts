import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { PaginationDTO } from '../common/dtos/pagination.dto';
import { RecadosUtils } from './recados.utils';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
  ) {}

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    console.log(
      this.recadosUtils.invertString(
        'testando recadosutils no recados controller',
      ),
    );
    return this.recadosService.findAll(pagination);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.recadosService.findById(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDTO) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDTO) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
