"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
var index_1 = require("../../_animations/index");
var ProcessDetailComponent = (function () {
    function ProcessDetailComponent(route, router, service, historyService, messageService) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.historyService = historyService;
        this.messageService = messageService;
        // subscribe to the messages sent from other components
        /*this.subscription = this.messageService.getConfirmed().subscribe((isConfirmed: boolean) => {
         this.onOkDelete(isConfirmed);
         });*/
    }
    ProcessDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.service.findById(params['id']).subscribe(function (process) {
                _this.process = process;
            });
        });
        this.route.params.subscribe(function (params) {
            _this.historyService.findByProcessInstanceId(params['id']).subscribe(function (processHistoryList) {
                _this.processHistoryList = processHistoryList;
            });
        });
    };
    ProcessDetailComponent.prototype.delete = function (id) {
        var _this = this;
        var confirmation = window.confirm('Are you sure you want to delete this Super Process?');
        if (confirmation) {
            this.service.delete(id).subscribe(function (res) {
                if (res.ok) {
                    _this.router.navigate(['/process']);
                }
                else {
                    alert('Couldn\'t delete 💩');
                }
            });
        }
    };
    return ProcessDetailComponent;
}());
ProcessDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'app-process-detail',
        templateUrl: './process-detail.component.html',
        styleUrls: ['./process-detail.component.css'],
        // make fade in animation available to this component
        animations: [index_1.fadeInAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    })
], ProcessDetailComponent);
exports.ProcessDetailComponent = ProcessDetailComponent;
