import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from '../conceitos-manual/conceitos-manual.module';
import { ConceitosCliModule } from '../conceitos-cli/conceitos-cli.module';

@Module({
  imports: [ConceitosManualModule, ConceitosCliModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
