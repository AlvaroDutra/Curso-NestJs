import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { RecadosEntity } from './entities/recados.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecadosUtils } from './recados.utils';
import { RegexFactory } from '../common/regex/regex.factory';
import {
  ONLY_LOWER_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
} from './recados.constants';
import { ModuloDinamicoModule } from '../modulo-dinamico/modulo-dinamico.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([RecadosEntity]),
    forwardRef(() => UsuariosModule),
    ModuloDinamicoModule.register({
      apiKey: 'API_KEY',
      apiUrl: 'http://api.com',
    }),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtils,
    RegexFactory,
    {
      provide: REMOVE_SPACES_REGEX, // token
      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('RemoveSpacesRegex');
      }, // factory
      inject: [RegexFactory], // Injetando na factory em ordem
    },
    {
      provide: ONLY_LOWER_LETTERS_REGEX, // token
      useFactory: async (regexFactory: RegexFactory) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return regexFactory.create('OnlyLowercaseLettersRegex');
      }, // factory assincrona
      inject: [RegexFactory], // Injetando na factory em ordem
    },
  ],
  exports: [RecadosUtils],
})
export class RecadosModule {}
