"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Process = (function () {
    function Process(executionId, processInstanceId, processKey, processDefinitionId, diagramURL, tenantId, latestActivity, tasks, processVariables) {
        this.executionId = executionId;
        this.processInstanceId = processInstanceId;
        this.processKey = processKey;
        this.processDefinitionId = processDefinitionId;
        this.diagramURL = diagramURL;
        this.tenantId = tenantId;
        this.latestActivity = latestActivity;
        this.tasks = tasks;
        this.processVariables = processVariables;
    }
    return Process;
}());
exports.Process = Process;
