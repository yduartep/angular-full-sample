import {Component, OnInit, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

// models
import {Villain} from '../shared/villain';

// services
import {VillainService} from '../shared/villain.service';
import {LoggerService} from '../../core/services/logger.service';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit {
  villains: Observable<Villain[]>;

  constructor(@Inject('LoggerService') private loggerService: LoggerService,
              private service: VillainService) {
  }

  ngOnInit() {
    this.loggerService.log('... initializing Villain list component.');
    this.villains = this.service.findAll();
  }

  onSearchText(result: Villain[]) {
    this.villains = Observable.of(result);
  }
}
