import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

@Injectable()
export default class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');

  use(req: Request, res: Response, next: NextFunction) {
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
      stream: {
        write: (message: unknown) => this.logger.log(message),
      },
    })(req, res, next);
  }
}
