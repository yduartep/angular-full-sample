import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './core/nav/menu';
import { TranslateService } from 'ng2-translate';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes and Villains';
  menus: Menu[] = [
    new Menu('Heroes', '/heroes', 'fa-flash'),
    new Menu('Villains', '/villains', 'fa-user-secret ')
  ];
  languages = [{id: 'en', value: 'English'}, {id: 'es', value: 'Spanish'}];

  constructor(
    @Inject('AuthService') private authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() { }

  isActive(): boolean {
    return this.authService.isUserLogged();
  }

  getUser(): string {
    return this.authService.getUserLogged();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

