import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthHelper } from './core/services/auth.helper';
import { Message } from './modal-message/message';
import { MessageService } from './modal-message/message.service';
import { ModalMessageComponent } from './modal-message/modal-message.component';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @ViewChild('modalMessage') modalMessage: ModalMessageComponent;

  constructor(
    private router: Router,
    @Inject('defaultLanguage') private defaultLanguage: string,
    private authHelper: AuthHelper,
    private translate: TranslateService,
    private messageService: MessageService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(defaultLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage['language'] || defaultLanguage);

    // subscribe to the messages sent from other components
    this.subscription = this.messageService.getMessage().subscribe((message: Message) => {
      if (message !== null) {
        this.modalMessage.message = message.text;
        this.modalMessage.status = message.status;
        this.modalMessage.type = message.type;
        this.modalMessage.show();
      }
    });
  }

  ngOnInit() { }

  isActive(): boolean {
    return this.authHelper.isUserLogged();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onOkConfirm(isOk) {
    console.log('I have clicked on ok buton. Value: ' + isOk);
    this.messageService.confirmMessage(isOk);
  }

  onCloseModal() {
    console.log('I have just closed the modal');
  }
}
