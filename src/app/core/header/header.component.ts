import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';

// services
import {AuthService} from '../services/auth.service';
import {AuthHelper} from '../services/auth.helper';
import {LoggerService} from '../services/logger.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private authHelper: AuthHelper,
              @Inject('LoggerService') private loggerService: LoggerService,
              @Inject('AuthService') private authService: AuthService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.loggerService.log('... initializing header component from core module.');
  }

  isActive(): boolean {
    return this.authHelper.isUserLogged();
  }

  getUser(): string {
    return this.authHelper.getUserLogged();
  }

  onLogout() {
    localStorage.removeItem('language');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
