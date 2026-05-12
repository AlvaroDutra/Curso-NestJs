import { Module } from '@nestjs/common';
import { ConceitosCliController } from './conceitos-cli.controller';
import { ConceitosCliService } from './conceitos-cli.service';

@Module({
  controllers: [ConceitosCliController],
  providers: [ConceitosCliService],
})
export class ConceitosCliModule {}
