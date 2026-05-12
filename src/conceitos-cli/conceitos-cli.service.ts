import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosCliService {
    conceito():string{
        return 'Treinando conceitos de Module, Controllers e Services no NestJS utilizando sua cli.'
    }
}
