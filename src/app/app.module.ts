import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import joi from '@hapi/joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        DATABASE_TYPE: joi.required(),
        DATABASE_HOST: joi.required(),
        DATABASE_PORT: joi.number().default(5432),
        DATABASE_USERNAME: joi.required(),
        DATABASE_DATABASE: joi.required(),
        DATABASE_PASSWORD: joi.required(),
        DATABASE_AUTOLOADENTITIES: joi.required(),
        DATABASE_SYNCHRONIZE: joi.required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: +!process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
    RecadosModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
