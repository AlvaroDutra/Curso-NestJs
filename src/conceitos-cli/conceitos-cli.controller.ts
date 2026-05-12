import { Controller, Get } from '@nestjs/common';
import { ConceitosCliService } from './conceitos-cli.service';

@Controller('conceitos-cli')
export class ConceitosCliController {
  constructor(private readonly conceitosCliService: ConceitosCliService){}
  
  @Get()
  getConceitos(): string {
    return this.conceitosCliService.conceito();
  }
}
