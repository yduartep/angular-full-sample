import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Alert} from './alert';
import {Observable} from 'rxjs/Observable';
import {AlertType} from './alert-type';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(id: string, params: any = {}, msg: string, dismissible = true, keepAfterRouteChange = false) {
    this.alert(id, params, msg, AlertType.SUCCESS, keepAfterRouteChange);
  }

  error(id: string, params: any = {}, msg: string, dismissible = true, keepAfterRouteChange = false) {
    this.alert(id, params, msg, AlertType.DANGER, keepAfterRouteChange);
  }

  info(id: string, params: any = {}, msg: string, dismissible = true, keepAfterRouteChange = false) {
    this.alert(id, params, msg, AlertType.INFO, keepAfterRouteChange);
  }

  warn(id: string, params: any = {}, msg: string, dismissible = true, keepAfterRouteChange = false) {
    this.alert(id, params, msg, AlertType.WARNING, keepAfterRouteChange);
  }

  alert(id: string, params: any, msg: string, type: string, dismissible = true, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{id: id, params: params, msg: msg, type: type, dismissible: dismissible});
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
