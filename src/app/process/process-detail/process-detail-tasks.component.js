"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import slide in/out animation
var index_1 = require("../../_animations/index");
var angular2_prettyjson_1 = require("angular2-prettyjson");
var ProcessDetailTasksComponent = (function () {
    function ProcessDetailTasksComponent(service, parent) {
        this.service = service;
        this.parent = parent;
    }
    ProcessDetailTasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.findById(this.parent.route.snapshot.params['id']).subscribe(function (process) {
            _this.processTasks = process.tasks;
        });
    };
    return ProcessDetailTasksComponent;
}());
ProcessDetailTasksComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'process-detail-tasks.component.html',
        styleUrls: ['./process-detail-children.component.css'],
        entryComponents: [angular2_prettyjson_1.PrettyJsonComponent],
        // make slide in/out animation available to this component
        animations: [index_1.slideInOutAnimation],
        // attach the slide in/out animation to the host (root) element of this component
        host: { '[@slideInOutAnimation]': '' }
    })
], ProcessDetailTasksComponent);
exports.ProcessDetailTasksComponent = ProcessDetailTasksComponent;
