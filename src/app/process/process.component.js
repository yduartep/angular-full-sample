"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_animations/index");
var ProcessComponent = (function () {
    function ProcessComponent() {
    }
    ProcessComponent.prototype.ngOnInit = function () {
        console.log('... Initializing Process component');
    };
    return ProcessComponent;
}());
ProcessComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        styleUrls: ['./process.component.css'],
        template: "<router-outlet></router-outlet>",
        // make fade in animation available to this component
        animations: [index_1.fadeInAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    })
], ProcessComponent);
exports.ProcessComponent = ProcessComponent;
