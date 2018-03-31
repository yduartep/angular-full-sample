import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
// NgRx
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {GetAllHeroes} from './store/heroes.actions';
import {
  getCreateError,
  getDeleteError,
  getHeroesError,
  getUpdateError,
  isCreated,
  isDeleted,
  isUpdated
} from './store/heroes.reducers';
// model & services
import {MessageService} from '../modal-message/message.service';
import {AlertService} from '../core/alert/alert.service';
import {Message} from '../modal-message/message';
import {MessageStatus} from '../modal-message/message-status';


@Component({
  styleUrls: ['./heroes.component.scss'],
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
    this.store.select(getHeroesError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      if (this.router.url === '/heroes') {
        // not change page
        this.actionSuccess(done, 'heroes.deleteOkMsg', false);
      } else {
        this.actionSuccess(done, 'heroes.deleteOkMsg');
      }
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'heroes.deleteErrMsg');
    });
    this.store.select(isUpdated).subscribe((done) => {
      this.actionSuccess(done, 'heroes.editOkMsg');
    });
    this.store.select(getUpdateError).subscribe((error) => {
      this.actionError(error, 'heroes.editErrMsg');
    });
    this.store.select(isCreated).subscribe((done) => {
      this.actionSuccess(done, 'heroes.insertOkMsg');
    });
    this.store.select(getCreateError).subscribe((error) => {
      this.actionError(error, 'heroes.insertErrMsg');
    });
  }

  /**
   * Display error message if load of heroes fails
   */
  loadingError(error) {
    if (error) {
      this.alertService.clear();
      const key = 'heroes.loadErrMsg';
      this.translate.get(key).subscribe(text => {
        this.alertService.error(key, {}, text);
        window.scrollTo(0, 0);
      });
    }
  }

  /**
   * Display success message after execute specific action over the hero
   * @param done true if action was completed or false
   * @param message the message to be displayed
   * @param goHome determine if redirect to the home page or not
   */
  actionSuccess(done: boolean, message: string, goHome: boolean = true) {
    if (done) {
      this.translate.get(message).subscribe(text => {
        this.messageService.showMessage(new Message(text, MessageStatus.SUCCESS));

        if (goHome) {
          this.router.navigate(['/heroes']);
        }
      });
    }
  }

  /**
   * Display error message if execution of action fails
   * @param error the error thrown
   * @param message the i18n key of the message to be displayed
   */
  actionError(error, message: string) {
    if (error) {
      this.translate.get(message).subscribe(text => {
        this.alertService.clear();
        this.alertService.error(message, {}, text);
        window.scrollTo(0, 0);
      });
    }
  }
}
