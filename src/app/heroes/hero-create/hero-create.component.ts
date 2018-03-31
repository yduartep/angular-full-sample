import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

// models
import {Hero} from '../shared/hero';
import {Mode} from '../../core/models/mode.enum';
import {Editorial} from '../../core/models/editorial';

// services
import {ValidationService} from '../../core/services/validation.service';
import {AuthHelper} from '../../core/services/auth.helper';
import {EditorialService} from '../../core/services/editorial.service';
import {AlertService} from '../../core/alert/alert.service';

// components
import {UIFormComponent} from '../../ui-elements/ui-form';

// NgRx
import * as heroActions from '../store/heroes.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent extends UIFormComponent {
  @Input() mode: Mode = Mode.CREATE;
  hero: Hero = new Hero(0, null, -1, null);
  editorials: Editorial[] = [];

  constructor(private editorialService: EditorialService,
              private alertService: AlertService,
              private authHelper: AuthHelper,
              validation: ValidationService,
              private store: Store<AppState>) {
    super(validation);

    this.editorialService.findAll().subscribe(result => {
      this.editorials = [new Editorial(-1, 'Select value ...')].concat(result);
    });
  }

  /**
   * Create a new hero
   */
  onSaveHero() {
    this.authHelper.checkAuthentication();
    this.alertService.clear();

    if (this.validate()) {
      this.store.dispatch(new heroActions.AddHero(this.hero));
    }
  }

  reset() {
    this.hero.editorial = -1;
    this.hero.name = '';
    this.hero.creationDate = null;
  }
}
