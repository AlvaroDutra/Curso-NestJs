import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { RecadosEntity } from './entities/recados.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecadosUtils } from './recados.utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecadosEntity]),
    forwardRef(() => UsuariosModule),
  ],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils],
  exports: [RecadosUtils],
})
export class RecadosModule {}
