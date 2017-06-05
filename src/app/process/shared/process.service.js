"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_service_1 = require("../../core/services/base.service");
var common_util_1 = require("../../core/utilities/common.util");
var ProcessService = (function (_super) {
    __extends(ProcessService, _super);
    function ProcessService(http, apiConfig, sanitizer) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.apiConfig = apiConfig;
        _this.sanitizer = sanitizer;
        return _this;
    }
    ProcessService.prototype.getServiceUrl = function () {
        return common_util_1.CommonUtil.getApiUrl('PROCESS_SERVICE_URL', this.apiConfig);
    };
    ProcessService.prototype.getImage = function (id) {
        var _this = this;
        return _super.prototype.getImage.call(this, id, '/image', 'image/jpg').map(function (blob) {
            var urlCreator = window.URL;
            return _this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
        });
    };
    ProcessService.prototype.filter = function (filter) {
        console.info(JSON.stringify(filter));
        return this.http.post(this.getServiceUrl() + '/filter', JSON.stringify(filter)).map(this.extractData);
    };
    return ProcessService;
}(base_service_1.BaseService));
ProcessService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('api.config'))
], ProcessService);
exports.ProcessService = ProcessService;
