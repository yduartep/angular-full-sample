import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {GetHero, UpdateHero} from '../store/heroes.actions';
import {getHero} from '../store/heroes.reducers';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent extends UIFormComponent implements OnInit {
  @Input() mode: Mode = Mode.EDIT;
  hero: Hero;
  editorials: Editorial[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authHelper: AuthHelper,
              private alertService: AlertService,
              private editorialService: EditorialService,
              validation: ValidationService,
              private store: Store<AppState>) {
    super(validation);
  }

  ngOnInit() {
    this.editorialService.findAll().subscribe(result => {
      this.editorials = [new Editorial(-1, 'Select value ...')].concat(result);
    });

    this.route.params.subscribe(params => {
      this.store.dispatch(new GetHero(+params['id']));
    });

    this.store.select(getHero).subscribe(hero => {
      if (hero != null) {
        this.hero = {...hero};
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
      this.store.dispatch(new UpdateHero(this.hero));
    }
  }

  /**
   * Display form in view mode
   */
  onReview() {
    this.mode = Mode.VIEW;
  }

  /**
   * If user is in view mode, back to edit mode else go to heroes page
   */
  onBack() {
    if (this.mode === Mode.VIEW) {
      this.mode = Mode.EDIT;
    } else {
      this.router.navigate(['/heroes']);
    }
  }

  /**
   * Reset all fields in the form
   */
  reset() {
    this.hero = {...this.hero, editorial: -1, name: '', creationDate: null};
  }
}
