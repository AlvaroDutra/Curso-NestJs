/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getRequest();
    const statusCode = exception.getStatus() ? exception.getStatus() : 400;
    const exceptionRes = exception.getResponse()
      ? exception.getResponse()
      : { message: 'error', statusCode };

    res.status(statusCode).json({
      ...exceptionRes,
      date: new Date().toISOString(),
      path: req.url,
    });
  }
}
