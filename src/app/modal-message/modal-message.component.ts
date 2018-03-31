import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MessageStatus} from './message-status';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {MessageType} from './message-type';
import {MessageService} from './message.service';
import {Message} from './message';
import {CommonUtil} from '../core/utilities/common.util';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  @Input() identifier = 'modalConfirm';
  @Input() type: string;
  @Input() title: string;
  @Input() status: string;
  @Input() message: string;
  @Input() onConfirmCallback: Function;
  @Input() onCancelCallback: Function;
  @Input() onHideCallback: Function;

  // settings

  /** Determine if display the success, warn, ... icon on the header. */
  @Input() displayIcon = true;

  /** Title of the Yes button in case of confirmation dialog */
  @Input() yesButtonTitle: string;

  /** Title of the No button in case of confirmation dialog */
  @Input() noButtonTitle: string;

  /** Title of the Close button in case of blocking dialog */
  @Input() closeButtonTitle: string;

  @ViewChild('modalMsg') modal: ModalDirective;

  constructor(private messageService: MessageService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.messageService.getMessage().subscribe((message: Message) => {
      this.message = message.text;
      this.status = message.status;
      this.type = message.type;
      if (message.settings) {
        this.onConfirmCallback = message.settings.onConfirmCallback;
        this.onCancelCallback = message.settings.onCancelCallback;
        if (!CommonUtil.isEmpty(message.settings.title)) {
          this.title = message.settings.title;
        }
        this.displayIcon = message.settings.displayIcons;

        if (!CommonUtil.isEmpty(message.settings.yesButtonTitle)) {
          this.yesButtonTitle = message.settings.yesButtonTitle;
        }
        if (!CommonUtil.isEmpty(message.settings.noButtonTitle)) {
          this.noButtonTitle = message.settings.noButtonTitle;
        }
        if (!CommonUtil.isEmpty(message.settings.closeButtonTitle)) {
          this.closeButtonTitle = message.settings.closeButtonTitle;
        }
      }
      this.show();
    });
  }

  /**
   * Gets the modal icon to display depending of the modal status
   */
  getIcon() {
    switch (this.status) {
      case MessageStatus.DANGER:
        return 'fa-times';
      case MessageStatus.INFO:
        return 'fa-info-circle';
      case MessageStatus.SUCCESS:
        return 'fa-check ';
      case MessageStatus.WARNING:
        return 'fa-exclamation-triangle';
      default:
        return 'fa-times';
    }
  }

  /**
   * Gets the modal title depending of the model status
   */
  getTitle() {
    if (CommonUtil.isEmpty(this.title)) {
      switch (this.status) {
        case MessageStatus.DANGER:
          return 'Error';
        case MessageStatus.INFO:
          return 'Info';
        case MessageStatus.SUCCESS:
          return 'Success ';
        case MessageStatus.WARNING:
          return 'Warning';
        default:
          return 'Error';
      }
    }
    return this.title;
  }

  /**
   * Gets the Ok title button in case of confirm dialog
   */
  getOkTitle(): Observable<String> {
    return this.translate.get('modalMessage.yesButton');
  }

  /**
   * Gets the No/Cancel title button in case of Confirm/Blocking dialog
   */
  getCancelTitle(): Observable<String> {
    if (this.type === MessageType.BLOCKING) {
      return this.translate.get('modalMessage.closeButton');
    } else {
      return this.translate.get('modalMessage.noButton');
    }
  }

  /**
   * Event that show the modal dialog
   */
  show() {
    this.modal.show();
  }

  hide() {
    if (this.onHideCallback) {
      this.onHideCallback();
    }
    this.modal.hide();

    // additional to avoid the bug that the body remain with class modal-open and the scroll hidden
    document.body.classList.remove('modal-open');
    document.body.removeAttribute('style');
  }

  /**
   * Event fired when click on ok button of confirm message
   */
  onConfirm() {
    if (this.onConfirmCallback) {
      this.onConfirmCallback();
    }
    this.hide();
  }

  /**
   * Event fired when click on cancel or close button
   */
  onCancel() {
    if (this.onCancelCallback) {
      this.onCancelCallback();
    }
    this.hide();
  }
}
