import {Component, EventEmitter, Output} from '@angular/core';

import {Villain} from '../shared/villain';
import {VillainSearchService} from './villains-search.service';

// observables
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-villain-search',
  templateUrl: './villain-search.component.html',
  styleUrls: ['./villain-search.component.scss'],
  providers: [VillainSearchService]
})
export class VillainSearchComponent {
  searchTerms$ = new Subject<string>();
  model: string;

  @Output()
  search: EventEmitter<Villain[]> = new EventEmitter<Villain[]>();

  constructor(private service: VillainSearchService) {
    this.searchTerms$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(terms => this.service.search(terms))
      .subscribe(results => {
        this.search.emit(results);
      });
  }
}
