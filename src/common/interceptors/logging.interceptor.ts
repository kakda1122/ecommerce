import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let method = 'HTTP';
    let url = '';

    // Determine context type safely and handle HTTP vs GraphQL
    const ctxType = context.getType ? (context.getType() as any) : undefined;

    // HTTP request
    if (ctxType === 'http') {
      const req = context.switchToHttp().getRequest();
      if (req) {
        method = req.method;
        url = req.url;
      }
    }

    // GraphQL request handling
    if (ctxType === 'graphql') {
      try {
        const gqlCtx = GqlExecutionContext.create(context as any);
        const info = gqlCtx.getInfo();
        const operation = info?.operation?.operation || 'query';
        method = operation.toUpperCase();
        url = info?.fieldName || info?.operation?.name?.value || '';
      } catch (e) {
        // fall through - keep defaults
      }
    }

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        const prefix = ctxType === 'graphql' ? 'GRAPHQL' : 'HTTP';
        console.log(`[${prefix}] ${method} ${url} - ${ms}ms`);
      }),
    );
  }
}
