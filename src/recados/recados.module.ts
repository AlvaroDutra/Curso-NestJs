import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { RecadosEntity } from './entities/recados.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { SERVER_NAME } from '../common/constants/server-name.constant';
import { RemoveSpacesRegex } from '../common/regex/remove-spaces.regex';
import { OnlyLowerCaseLetters } from '../common/regex/only-lowercase-letters.regex';
import {
  ONLY_LOWER_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
} from './recados.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecadosEntity]),
    forwardRef(() => UsuariosModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils, //Token
      useValue: new RecadosUtilsMock(), //Valor usado
    },
    {
      provide: SERVER_NAME,
      useValue: 'My name is NestJS.',
    },
    {
      provide: ONLY_LOWER_LETTERS_REGEX,
      useClass: OnlyLowerCaseLetters,
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesRegex,
    },
  ],
  exports: [RecadosUtils, SERVER_NAME],
})
export class RecadosModule {}
