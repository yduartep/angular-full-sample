import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { ModalType } from './modal-type.enum';
import { ModalStatus } from './modal-status.enum';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent implements OnInit {
  @Input()
  message: string;

  @Input()
  status: ModalStatus;

  @Input()
  type: ModalType;

  @Output() onOk: EventEmitter<boolean> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalAlert') modal: ModalDirective;

  constructor() {
  }

  ngOnInit() { }

  /**
   * Mehtod that returns the modal icon to display depending of the modal status
   */
  getIcon() {
    switch (this.status) {
      case ModalStatus.DANGER:
        return 'fa-times';
      case ModalStatus.INFO:
        return 'fa-info-circle';
      case ModalStatus.SUCCESS:
        return 'fa-check ';
      case ModalStatus.WARNING:
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
      case ModalStatus.DANGER:
        return 'Error';
      case ModalStatus.INFO:
        return 'Info';
      case ModalStatus.SUCCESS:
        return 'Success ';
      case ModalStatus.WARNING:
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
    if (this.type === ModalType.BLOCKING) {
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
      if (this.type === ModalType.CONFIRM) {
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
