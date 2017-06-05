"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessFilterForm = (function () {
    function ProcessFilterForm() {
        this._variablesToFilter = new Map();
    }
    Object.defineProperty(ProcessFilterForm.prototype, "processDefinitionElement", {
        get: function () {
            return this._processDefinitionElement;
        },
        set: function (value) {
            this._processDefinitionElement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessFilterForm.prototype, "processDefinition", {
        get: function () {
            return this._processDefinition;
        },
        set: function (value) {
            this._processDefinition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessFilterForm.prototype, "variablesToFilter", {
        get: function () {
            return this._variablesToFilter;
        },
        set: function (value) {
            this._variablesToFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessFilterForm.prototype, "processInstanceId", {
        get: function () {
            return this._processInstanceId;
        },
        set: function (value) {
            this._processInstanceId = value;
        },
        enumerable: true,
        configurable: true
    });
    return ProcessFilterForm;
}());
exports.ProcessFilterForm = ProcessFilterForm;
