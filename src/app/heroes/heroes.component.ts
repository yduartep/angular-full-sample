import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {GetAllHeroes} from './heroes.actions';
import {getDeleteError, getHeroesError, isDeleted} from './heroes.reducers';
import {MessageStatus} from '../modal-message/message-status';
import {MessageService} from '../modal-message/message.service';
import {Router} from '@angular/router';
import {Message} from '../modal-message/message';
import {AlertService} from '../core/alert/alert.service';

@Component({
  styleUrls: ['./heroes.component.css'],
  template: `
    <router-outlet></router-outlet>`
})
export class HeroesComponent implements OnInit {

  constructor(@Inject('defaultLanguage') private defaultLanguage: string,
              private router: Router,
              private translate: TranslateService,
              private messageService: MessageService,
              private alertService: AlertService,
              private store: Store<AppState>) {

    translate.use(localStorage['language'] || defaultLanguage);
  }

  ngOnInit() {
    console.log('... Initializing Heroes component');
    this.store.dispatch(new GetAllHeroes());

    // subscriptions when success or error action
    this.store.select(getHeroesError).subscribe((error) => {
      if (error) {
        this.loadingError();
      }
    });
    this.store.select(isDeleted).subscribe((deleted) => {
      if (deleted) {
        this.deleteSuccess();
      }
    });
    this.store.select(getDeleteError).subscribe((error) => {
      if (error) {
        this.deleteError();
      }
    });
  }

  /**
   * Display error message if load of heroes fails
   */
  loadingError() {
    const key = 'heroes.loadErrMsg';
    this.translate.get(key).subscribe(text => {
      this.alertService.error(key, {}, text);
    });
  }

  /**
   * Display success message after delete the hero
   */
  deleteSuccess() {
    const key = 'heroes.deleteOkMsg';
    this.translate.get(key).subscribe(text => {
      this.messageService.showMessage(new Message(text, MessageStatus.SUCCESS));
      this.router.navigate(['/heroes']);
    });
  }

  /**
   * Display error message is deletion fails
   */
  deleteError() {
    const key = 'heroes.deleteErrMsg';
    this.translate.get(key).subscribe(text => {
      this.alertService.error(key, {}, text);
    });
  }
}
