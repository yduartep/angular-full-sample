import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable()
export class BroadcasterService {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: any, data?: any): void {
    this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }
}
