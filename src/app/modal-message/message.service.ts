import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

import {Message} from './message';

@Injectable()
export class MessageService {
  private subjectMsg = new Subject<Message>();
  private subjectConfirmed = new Subject<boolean>();

  showMessage(message: Message) {
    this.subjectMsg.next(message);
  }

  getMessage(): Observable<any> {
    return this.subjectMsg.asObservable();
  }
}
