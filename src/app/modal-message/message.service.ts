import {Injectable} from '@angular/core';

// models
import {Message} from './message';

// observable
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subjectMsg = new Subject<Message>();

  showMessage(message: Message) {
    this.subjectMsg.next(message);
  }

  getMessage(): Observable<any> {
    return this.subjectMsg.asObservable();
  }
}
