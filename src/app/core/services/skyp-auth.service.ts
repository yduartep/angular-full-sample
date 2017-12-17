import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class SkypAuthService  implements AuthService {

  constructor() {}

  login(username: string, password: string) {
    // DO nothing
  }

  logout() {
    // DO nothing
  }
}
