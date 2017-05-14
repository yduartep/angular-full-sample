import { ErrorHandler } from '@angular/core';
import { SimpleErrorHandler } from '../error.handler';

export function errorHandlerFactory(): ErrorHandler {
    return new SimpleErrorHandler();
}