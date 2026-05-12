import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  conceitos(): string {
    return 'Treinando conceitos de Module, Controllers e Services no NestJS manualmente (escrevendo na mão).';
  }
}
