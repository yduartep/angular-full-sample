import { Http } from '@angular/http';

// services
import { LoggerService } from '../services/logger.service';
import { ConsoleLoggerService } from '../services/console-logger.service';

export function loggerFactory(): LoggerService {
    return new ConsoleLoggerService();
}