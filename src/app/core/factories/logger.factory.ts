import { Http } from '@angular/http';

// services
import { LoggerService } from '../services/logger.service';
import { ConsoleLoggerService } from '../services/console-logger.service';

// configurations
import { LoggerTypes } from './logger.type';
import { environment } from '../../../environments/environment';

export function loggerFactory(): LoggerService {
    switch (environment.apiConfig.loggerService) {
        case LoggerTypes.CONSOLE:
            return new ConsoleLoggerService();
        default:
            return new ConsoleLoggerService();
    }
}
