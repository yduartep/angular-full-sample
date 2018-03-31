import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

// models
import {MessageStatus} from '../modal-message/message-status';
import {Message} from '../modal-message/message';

// services
import {MessageService} from '../modal-message/message.service';
import {AlertService} from '../core/alert/alert.service';

// NgRx
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {GetAllVillains} from './store/villains.actions';
import {getDeleteError, getVillainsError, isDeleted} from './store/villains.reducers';

@Component({
  styleUrls: ['./villains.component.scss'],
  template: `
    <router-outlet></router-outlet>`
})
export class VillainsComponent implements OnInit {

  constructor(@Inject('defaultLanguage') private defaultLanguage: string,
              private router: Router,
              private translate: TranslateService,
              private messageService: MessageService,
              private alertService: AlertService,
              private store: Store<AppState>) {

    translate.use(localStorage['language'] || defaultLanguage);
  }

  ngOnInit() {
    console.log('... Initializing Villains component');
    this.store.dispatch(new GetAllVillains());

    // subscriptions when success or error action
    this.store.select(getVillainsError).subscribe((error) => this.loadingError(error));
    this.store.select(isDeleted).subscribe((done) => {
      this.actionSuccess(done, 'villains.deleteOkMsg');
    });
    this.store.select(getDeleteError).subscribe((error) => {
      this.actionError(error, 'villains.deleteErrMsg');
    });
  }

  /**
   * Display error message if load of villains fails
   */
  loadingError(error) {
    if (error) {
      this.alertService.clear();
      const key = 'villains.loadErrMsg';
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
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      this.translate.get(message).subscribe(text => {
        this.messageService.showMessage(new Message(text, MessageStatus.SUCCESS));
        this.router.navigate(['/villains']);
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
