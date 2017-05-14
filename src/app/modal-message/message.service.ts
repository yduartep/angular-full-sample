import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { Message } from './message';

@Injectable()
export class MessageService {
    private subjectMsg = new Subject<Message>();
    private subjectConfirmed = new Subject<boolean>();

    showMessage(message: Message) {
        this.subjectMsg.next(message);
    }

    confirmMessage(value: boolean, ) {
        this.subjectConfirmed.next(value);
    }

    getMessage(): Observable<any> {
        return this.subjectMsg.asObservable();
    }

    getConfirmed(): Observable<any> {
        return this.subjectConfirmed.asObservable();
    }
}
