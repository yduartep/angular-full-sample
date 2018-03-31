import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

// observable
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

// models
import {Hero} from '../shared/hero';
import {ModalMessageSettings} from '../../modal-message/modal-message-settings';
import {Message} from '../../modal-message/message';
import {MessageStatus} from '../../modal-message/message-status';
import {MessageType} from '../../modal-message/message-type';
import {Editorial} from '../../core/models/editorial';

// services
import {AuthHelper} from '../../core/services/auth.helper';
import {MessageService} from '../../modal-message/message.service';
import {TranslateService} from '@ngx-translate/core';
import {EditorialService} from '../../core/services/editorial.service';

// NgRx
import {Store} from '@ngrx/store';
import * as heroActions from '../store/heroes.actions';
import {GetHero} from '../store/heroes.actions';
import {AppState} from '../../app.state';
import {getHero} from '../store/heroes.reducers';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Observable<Hero>;
  editorials: Observable<Editorial[]>;

  constructor(private route: ActivatedRoute,
              private authHelper: AuthHelper,
              private editorialService: EditorialService,
              private messageService: MessageService,
              private translate: TranslateService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetHero(+params['id']));
    });
    this.editorials = this.editorialService.findAll();
    this.hero = this.store.select(getHero);
  }

  /**
   * Display delete confirmation message
   * @param {number} id the hero id o be deleted
   */
  delete(id: number) {
    this.authHelper.checkAuthentication();

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
