import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { MessageType } from './message-type';
import { MessageStatus } from './message-status';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {
  @Input()
  message: string;

  @Input()
  status: string;

  @Input()
  type: string;

  @Output() onOk: EventEmitter<boolean> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalMsg') modal: ModalDirective;

  constructor() {
  }

  ngOnInit() { }

  /**
   * Mehtod that returns the modal icon to display depending of the modal status
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
   * Mehtod that returns the modal title depending of the model status
   */
  getTitle() {
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

  /**
   * Mehtod that returns the Ok title button translated
   */
  getOkTitle() {
    // TO be translated
    return 'OK';
  }

  /**
   * Method that returns the cancel title button translated
   */
  getCancelTitle() {
    // TO be translated
    if (this.type === MessageType.BLOCKING) {
      return 'Close';
    } else {
      return 'Cancel';
    }
  }

  /**
   * Event that show the modal dialog
   */
  show() {
    this.modal.show();
  }

  /**
   * Event that hide the modal dialog
   */
  hide() {
    if (this.modal && this.modal.isShown) {
      if (this.type === MessageType.CONFIRM) {
        this.onOk.emit(false);
      }
      this.modal.hide();
      this.onClose.emit(null);
    }
  }

  /**
   * Event fired when click on ok button of confirm message
   */
  onOKEvent() {
    this.onOk.emit(true);
    this.modal.hide();
    this.onClose.emit(null);
  }

  /**
   * Event fired when click on cancel or close button
   */
  onCancelEvent() {
    this.hide();
  }
}
