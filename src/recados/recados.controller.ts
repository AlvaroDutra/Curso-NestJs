import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { PaginationDTO } from '../common/dtos/pagination.dto';
import { REMOVE_SPACES_REGEX } from './recados.constants';
import { RemoveSpacesRegex } from '../common/regex/remove-spaces.regex';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RemoveSpacesRegex,
  ) {}

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    console.log(this.removeSpacesRegex.execute('REMOVE OS ESPAÇOS'));
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
