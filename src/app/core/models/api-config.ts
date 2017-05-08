import { ApiUrl } from './api-url';
import { Credentials } from './credentials';

export class ApiConfig {
  apiEnv: string;
  apiUrls: ApiUrl[] = [];
  timeExpired: number;
  credentials: Credentials
}
