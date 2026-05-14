import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDTO } from './create-recado.dto';

export class UpdateRecadoDTO extends PartialType(CreateRecadoDTO) {}
