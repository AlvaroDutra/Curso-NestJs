import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('OutroMiddleware diz ola');
    const authorization = req.headers?.authorization;
    if (authorization) {
      req['user'] = {
        nome: `Luiz`,
        sobrenome: `Otario`,
      };
    }
    res.setHeader('CABECALHO', 'Do SimpleMiddleware');
    // return res.status(404).send({
    //   message: 'Nao encontrado',
    // });
    next();
    console.log('OutroMiddleware diz adeus');
  }
}
