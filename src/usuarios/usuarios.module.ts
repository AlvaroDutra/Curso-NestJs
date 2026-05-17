import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuariosEntity } from './entities/usuario.entity';
import { RecadosModule } from '../recados/recados.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuariosEntity]),
    forwardRef(() => RecadosModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
