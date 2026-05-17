/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class MyExceptionFilter<
  T extends BadRequestException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getRequest();

    const statusCode = exception.getStatus();
    const exceptionRes = exception.getResponse();

    const error =
      typeof res === 'string'
        ? {
            message: exceptionRes,
          }
        : (exceptionRes as object);

    res.status(statusCode).json({
      ...error,
      date: new Date().toDateString(),
      path: req.url,
    });
    return;
  }
}
