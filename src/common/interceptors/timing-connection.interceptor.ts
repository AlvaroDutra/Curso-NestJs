import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - start;
        console.log(`TimingConnectionInterceptor executado em ${elapsed} ms`);
      }),
    );
  }
}
