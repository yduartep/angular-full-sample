import { MessageStatus } from './message-status';
import { MessageType } from './message-type';

export class Message {
    constructor(public text: string, public status: string = MessageStatus.DANGER, public type: string = MessageType.BLOCKING) {
        status = status.toUpperCase();
        if (status !== MessageStatus.INFO &&
            status !== MessageStatus.SUCCESS &&
            status !== MessageStatus.WARNING &&
            status !== MessageStatus.DANGER) {
            throw new Error('Invalid message status. Should be Info, Success, Warning or Danger.');
        }

        type = type.toUpperCase();
        if (type !== MessageType.BLOCKING &&
            type !== MessageType.CONFIRM) {
            throw new Error('Invalid message type. Should be Blocking or Confirm.');
        }
        this.text = text;
        this.status = status;
        this.type = type;
    }
}
