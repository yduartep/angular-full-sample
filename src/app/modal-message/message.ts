import { MessageStatus } from './message-status';
import { MessageType } from './message-type';
import { MessageFormat } from './message-format';

export class Message {
    constructor(public text: string, public status: string = MessageStatus.DANGER, public type: string = MessageType.BLOCKING, public format: string = MessageFormat.STRING) {
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

      if (format !== MessageFormat.STRING &&
        format !== MessageFormat.JSON) {
        throw new Error('Invalid message formar. Should be String or Json.');
      }
        this.text = text;
        this.status = status;
        this.type = type;
        this.format = format;
    }
}
