"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_status_1 = require("./message-status");
var message_type_1 = require("./message-type");
var message_format_1 = require("./message-format");
var Message = (function () {
    function Message(text, status, type, format) {
        if (status === void 0) { status = message_status_1.MessageStatus.DANGER; }
        if (type === void 0) { type = message_type_1.MessageType.BLOCKING; }
        if (format === void 0) { format = message_format_1.MessageFormat.STRING; }
        this.text = text;
        this.status = status;
        this.type = type;
        this.format = format;
        status = status.toUpperCase();
        if (status !== message_status_1.MessageStatus.INFO &&
            status !== message_status_1.MessageStatus.SUCCESS &&
            status !== message_status_1.MessageStatus.WARNING &&
            status !== message_status_1.MessageStatus.DANGER) {
            throw new Error('Invalid message status. Should be Info, Success, Warning or Danger.');
        }
        type = type.toUpperCase();
        if (type !== message_type_1.MessageType.BLOCKING &&
            type !== message_type_1.MessageType.CONFIRM) {
            throw new Error('Invalid message type. Should be Blocking or Confirm.');
        }
        if (format !== message_format_1.MessageFormat.STRING &&
            format !== message_format_1.MessageFormat.JSON) {
            throw new Error('Invalid message formar. Should be String or Json.');
        }
        this.text = text;
        this.status = status;
        this.type = type;
        this.format = format;
    }
    return Message;
}());
exports.Message = Message;
