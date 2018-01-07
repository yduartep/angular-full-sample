import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';

@Injectable()
export class ConsoleLoggerService implements LoggerService {

  log(msg: string) {
    console.log(msg);
  }

  error(msg: string) {
    console.error(msg);
  }

  warn(msg: string) {
    console.warn(msg);
  }

  info(msg: string) {
    console.log(msg);
  }
}
