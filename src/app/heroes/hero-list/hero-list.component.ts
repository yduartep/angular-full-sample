import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TranslateService} from '@ngx-translate/core';

// models
import {Hero} from '../shared/hero';
import {Message} from '../../modal-message/message';
import {MessageType} from '../../modal-message/message-type';
import {MessageStatus} from '../../modal-message/message-status';
import {ModalMessageSettings} from '../../modal-message/modal-message-settings';

// services
import {HeroService} from '../shared/hero.service';
import {LoggerService} from '../../core/services/logger.service';
import {MessageService} from '../../modal-message/message.service';
import {AuthHelper} from '../../core/services/auth.helper';
import {AlertService} from '../../core/alert/alert.service';

// ngrx
import {Store} from '@ngrx/store';
import * as heroActions from '../heroes.actions';
import {AppState} from '../../app.state';
import {getAllHeroes, getDeleteError, getHeroesError, isDeleted} from '../heroes.reducers';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;

  constructor(@Inject('LoggerService') private loggerService: LoggerService,
              private service: HeroService,
              private authHelper: AuthHelper,
              private alertService: AlertService,
              private messageService: MessageService,
              private translate: TranslateService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.loggerService.log('... initializing Hero list component.');

    this.heroes = this.store.select(getAllHeroes);
  }

  /**
   * Delete the selected hero
   * @param {number} id the hero id
   */
  delete(id: number) {
    this.authHelper.checkAuthentication();
    this.alertService.clear();

    this.translate.get('heroes.confirmDeleteMsg').subscribe(text => {
      // create settings
      const settings = new ModalMessageSettings();
      settings.onConfirmCallback = this.onOkDelete.bind(this, id);

      // display the modal calling the service
      this.messageService.showMessage(new Message(text, MessageStatus.WARNING, MessageType.CONFIRM, settings));
    });
  }

  /**
   * What to do if confirm to delete the hero
   * @param id the hero identifier
   */
  onOkDelete(id) {
    this.store.dispatch(new heroActions.RemoveHero(id));
  }
}
