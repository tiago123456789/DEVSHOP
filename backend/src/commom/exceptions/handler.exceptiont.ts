import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from './app.exception';

@Catch(AppException)
export class HandlerException implements ExceptionFilter {
    
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
        // @ts-ignore 
      .status(exception.getStatusCode())
      .json({
        statusCode: exception.getStatusCode(),
        timestamp: new Date().toISOString(),
        error: exception.message
      });
  }
}