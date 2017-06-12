"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessDefinition = (function () {
    function ProcessDefinition(id, name, key, deploymentId, initialDeclaredVariables, deploymentDate) {
        this.id = id;
        this.name = name;
        this.key = key;
        this.deploymentId = deploymentId;
        this.initialDeclaredVariables = initialDeclaredVariables;
        this.deploymentDate = deploymentDate;
    }
    return ProcessDefinition;
}());
exports.ProcessDefinition = ProcessDefinition;
