"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var MessageService = (function () {
    function MessageService() {
        this.subjectMsg = new Subject_1.Subject();
        this.subjectConfirmed = new Subject_1.Subject();
    }
    MessageService.prototype.showMessage = function (message) {
        this.subjectMsg.next(message);
    };
    MessageService.prototype.confirmMessage = function (value) {
        this.subjectConfirmed.next(value);
    };
    MessageService.prototype.getMessage = function () {
        return this.subjectMsg.asObservable();
    };
    MessageService.prototype.getConfirmed = function () {
        return this.subjectConfirmed.asObservable();
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable()
], MessageService);
exports.MessageService = MessageService;
