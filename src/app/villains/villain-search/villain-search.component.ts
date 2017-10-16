import {Component, Output, EventEmitter} from '@angular/core';

import {Villain} from '../shared/villain';
import {VillainSearchService} from './villains-search.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-villain-search',
  templateUrl: './villain-search.component.html',
  styleUrls: ['./villain-search.component.css'],
  providers: [VillainSearchService]
})
export class VillainSearchComponent {
  searchTerms$ = new Subject<string>();
  model: string;

  @Output()
  onSearch: EventEmitter<Villain[]> = new EventEmitter<Villain[]>();

  constructor(private service: VillainSearchService) {
    this.searchTerms$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(terms => this.service.search(terms))
      .subscribe(results => {
        this.onSearch.emit(results);
      });
  }
}
