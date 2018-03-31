import {Component, OnInit, Inject, ChangeDetectionStrategy} from '@angular/core';

// observable
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// models
import {Editorial} from '../../core/models/editorial';
import {Villain} from '../shared/villain';

// services
import {LoggerService} from '../../core/services/logger.service';
import {EditorialService} from '../../core/services/editorial.service';
import {AlertService} from '../../core/alert/alert.service';

// NgRx
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {getAllVillains} from '../store/villains.reducers';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainListComponent implements OnInit {
  villains: Observable<Villain[]>;
  editorials: Observable<Editorial[]>;

  constructor(@Inject('LoggerService') private loggerService: LoggerService,
              private editorialService: EditorialService,
              private alertService: AlertService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.alertService.clear();
    this.loggerService.log('... initializing Villain list component.');
    this.editorials = this.editorialService.findAll();
    this.villains = this.store.select(getAllVillains);
  }

  onSearchText(result: Villain[]) {
    this.villains = Observable.of(result);
  }

  /**
   * The track by function
   *
   * @param index the index
   * @param item the item
   */
  trackById(index, item) {
    return item.id;
  }
}
