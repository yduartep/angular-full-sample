import { Component, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Villain } from '../shared/villain';
import { Editorial } from '../shared/editorial.enum';
import { VillainService } from '../shared/villain.service';
import { VillainSearchService } from './villains-search.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-villain-search',
  templateUrl: './villain-search.component.html',
  styleUrls: ['./villain-search.component.css'],
  providers: [VillainSearchService]
})
export class VillainSearchComponent implements OnInit {
  villains: Villain[] = [];
  searchText = '';

  @Output()
  onSearch: EventEmitter<Villain[]> = new EventEmitter<Villain[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VillainSearchService
  ) { }

  ngOnInit() { }

  onSearchEvent() {
    console.log(this.searchText);

    this.service.search(this.searchText)
      .subscribe(villains => {
        this.villains = villains.map(villain => {
          villain['editorialText'] = Editorial[villain.editorial];
          return villain;
        });

        this.onSearch.emit(this.villains);
      });
  }

  private handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.onSearchEvent();
    }
  }
}
