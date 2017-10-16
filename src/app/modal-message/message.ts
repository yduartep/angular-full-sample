import {MessageStatus} from './message-status';
import {MessageType} from './message-type';
import {ModalMessageSettings} from './modal-message-settings';

export class Message {
  constructor(public text: string,
              public status: string = MessageStatus.DANGER,
              public type: string = MessageType.BLOCKING,
              public settings?: ModalMessageSettings) {

    const descStatus = status.toUpperCase();
    if (descStatus !== MessageStatus.INFO &&
      descStatus !== MessageStatus.SUCCESS &&
      descStatus !== MessageStatus.WARNING &&
      descStatus !== MessageStatus.DANGER) {
      throw new Error('Invalid message status. Should be Info, Success, Warning or Danger.');
    }
    const descType = type.toUpperCase();
    if (descType !== MessageType.BLOCKING && descType !== MessageType.CONFIRM) {
      throw new Error('Invalid message type. Should be Blocking or Confirm.');
    }
    // TODO remove these initialization. No necessary
    // this.title = title;
    // this.text = text;
    // this.status = status;
    // this.onConfirmCallback = onConfirmCallback;
    // this.onCancelCallback = onCancelCallback;
  }
}
