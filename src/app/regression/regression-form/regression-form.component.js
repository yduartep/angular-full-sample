"use strict";
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
var index_1 = require("../../_animations/index");
var process_filter_form_1 = require("./process-filter-form");
var process_filter_1 = require("../shared/process-filter");
var process_filter_form_variable_1 = require("./process-filter-form-variable");
var ProcessListComponent = (function () {
    function ProcessListComponent(loggerService, processService, processDefinitionService, messageService) {
        this.loggerService = loggerService;
        this.processService = processService;
        this.processDefinitionService = processDefinitionService;
        this.messageService = messageService;
        this.isRequesting = false;
        this._processFilterForm = new process_filter_form_1.ProcessFilterForm();
        // subscribe to the messages sent from other components
    }
    ProcessListComponent.prototype.ngOnInit = function () {
        this.loggerService.log('... initializing Process list component.');
        this.isRequesting = true;
        this.loadProcessDefinitions();
        this.findAll();
    };
    ProcessListComponent.prototype.findAll = function () {
        var _this = this;
        this.processService.findAll()
            .subscribe(function (processes) {
            _this._data = processes.map(function (process) {
                return process;
            });
        });
    };
    ProcessListComponent.prototype.loadProcessDefinitions = function () {
        var _this = this;
        this.processDefinitionService.findAll()
            .subscribe(function (processDefinitions) {
            _this._processDefinitions = processDefinitions.map(function (processDefinition) {
                return processDefinition;
            });
        });
    };
    ProcessListComponent.prototype.loadProcessDefinitionElements = function (processDefinition) {
        var _this = this;
        this.processDefinitionService.getElements(processDefinition.id)
            .subscribe(function (processDefinitionElements) {
            _this._processDefinitionElements = processDefinitionElements.map(function (processDefinitionElement) {
                return processDefinitionElement;
            });
        });
    };
    ProcessListComponent.prototype.filter = function () {
        var _this = this;
        if (this.processFilterForm.processInstanceId) {
            this.processService.findById(this.processFilterForm.processInstanceId).subscribe(function (process) {
                _this.data = [process];
            });
        }
        else {
            var processVariableToFilterMap_1 = {};
            this.processFilterForm.variablesToFilter.forEach(function (processVariableToFilter) {
                return processVariableToFilterMap_1[processVariableToFilter.variableKey] = processVariableToFilter.variableValue;
            });
            var processFilter = new process_filter_1.ProcessFilter(this.processFilterForm.processDefinitionElement ?
                this.processFilterForm.processDefinitionElement.key : undefined, this.processFilterForm.processDefinition ? this.processFilterForm.processDefinition.id : undefined, processVariableToFilterMap_1);
            this.processService.filter(processFilter)
                .subscribe(function (processes) {
                _this._data = processes;
            });
        }
    };
    ProcessListComponent.prototype.reset = function () {
        this.processFilterForm = new process_filter_form_1.ProcessFilterForm();
        this.processDefinitionElements = null;
        this.findAll();
    };
    ProcessListComponent.prototype.addVariable = function () {
        this.processFilterForm.variablesToFilter.push(new process_filter_form_variable_1.ProcessFilterFormVariable('', ''));
    };
    ProcessListComponent.prototype.removeVariable = function (processFilterFormVariable) {
        var index = this.processFilterForm.variablesToFilter.indexOf(processFilterFormVariable, 0);
        this.processFilterForm.variablesToFilter.splice(index, 1);
    };
    ProcessListComponent.prototype.isFormEnabled = function () {
        return this.processFilterForm.processInstanceId ||
            ((this.processFilterForm.processDefinition && !this.isAddNewVariableDisabled()) ||
                (this.processFilterForm.variablesToFilter.length > 0 && !this.isAddNewVariableDisabled()));
    };
    ProcessListComponent.prototype.isAddNewVariableDisabled = function () {
        return this.processFilterForm.variablesToFilter.length > 0 &&
            this.processFilterForm.variablesToFilter.find(function (processVariable) { return !processVariable.variableKey ||
                !processVariable.variableValue; });
    };
    Object.defineProperty(ProcessListComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessListComponent.prototype, "processDefinitions", {
        get: function () {
            return this._processDefinitions;
        },
        set: function (value) {
            this._processDefinitions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessListComponent.prototype, "processDefinitionElements", {
        get: function () {
            return this._processDefinitionElements;
        },
        set: function (value) {
            this._processDefinitionElements = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessListComponent.prototype, "processFilterForm", {
        get: function () {
            return this._processFilterForm;
        },
        set: function (value) {
            this._processFilterForm = value;
        },
        enumerable: true,
        configurable: true
    });
    return ProcessListComponent;
}());
ProcessListComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'app-process-list',
        templateUrl: './regression-form.component.html',
        styleUrls: ['./regression-form.component.css'],
        // make fade in animation available to this component
        animations: [index_1.fadeInAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    }),
    __param(0, core_1.Inject('LoggerService'))
], ProcessListComponent);
exports.ProcessListComponent = ProcessListComponent;
