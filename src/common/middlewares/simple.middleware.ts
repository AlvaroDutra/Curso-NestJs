import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware diz ola');
    const authorization = req.headers?.authorization;
    if (authorization) {
      req['user'] = {
        nome: 'Luiz',
        sobrenome: 'Otario',
        role: 'admin',
      };
    }
    res.setHeader('CABECALHO', 'Do SimpleMiddleware');
    // return res.status(404).send({
    //   message: 'Nao encontrado',
    // });
    next();
    console.log('SimpleMiddleware diz adeus');
    res.on('finish', () => {
      console.log('SimpleMiddleware terminou ');
    });
  }
}
