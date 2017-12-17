import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

// models
import {Hero} from '../shared/hero';
import {Mode} from '../../core/models/mode.enum';
import {Editorial} from '../../core/models/editorial';
import {Message} from '../../modal-message/message';
import {MessageStatus} from '../../modal-message/message-status';

// services
import {ValidationService} from '../../core/services/validation.service';
import {AuthHelper} from '../../core/services/auth.helper';
import {EditorialService} from '../../core/services/editorial.service';
import {AlertService} from '../../core/alert/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from '../../modal-message/message.service';

// components
import {UIFormComponent} from '../../ui-elements/ui-form';

// ngrx
import * as heroActions from '../heroes.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {getCreateError, isCreated} from '../heroes.reducers';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent extends UIFormComponent {
  @Input() mode: Mode = Mode.CREATE;
  hero: Hero = new Hero(0, null, null, null);
  selected = -1;
  editorials: Editorial[] = [];

  constructor(private router: Router,
              private editorialService: EditorialService,
              private alertService: AlertService,
              private messageService: MessageService,
              private authHelper: AuthHelper,
              private translate: TranslateService,
              validation: ValidationService,
              private store: Store<AppState>) {
    super(validation);

    this.editorialService.findAll().subscribe(result => {
      this.editorials = [{id: -1, text: 'Select value ...'}].concat(result);
    });
    this.store.select(isCreated).subscribe((created) => {
      if (created) {
        this.createSuccess();
      }
    });
    this.store.select(getCreateError).subscribe((error) => {
      if (error) {
        this.createError();
      }
    });
  }

  /**
   * Create a new hero
   */
  onSaveHero() {
    this.authHelper.checkAuthentication();
    this.alertService.clear();

    if (this.validate()) {
      this.hero.editorial = this.editorials.find(e => e.id === +this.selected);
      this.store.dispatch(new heroActions.AddHero(this.hero));
    }
  }

  /**
   * Display success message after add the hero
   */
  createSuccess() {
    const key = 'heroes.insertOkMsg';
    this.translate.get(key).subscribe(text => {
      this.messageService.showMessage(new Message(text, MessageStatus.SUCCESS));
      this.router.navigate(['/heroes']);
    });
  }

  /**
   * Display error message if add fails
   */
  createError() {
    const key = 'heroes.insertErrMsg';
    this.translate.get(key).subscribe(text => {
      this.alertService.error(key, {}, text);
    });
  }

  reset() {
    this.hero.image = '';
    this.selected = -1;
    this.hero.name = '';
  }
}
