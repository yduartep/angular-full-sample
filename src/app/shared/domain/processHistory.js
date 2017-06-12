"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessHistory = (function () {
    function ProcessHistory(processDefinitionId, processInstanceId, executionId, activityId, activityName, activityType, assignee, startDate, endDate, duration) {
        this.processDefinitionId = processDefinitionId;
        this.processInstanceId = processInstanceId;
        this.executionId = executionId;
        this.activityId = activityId;
        this.activityName = activityName;
        this.activityType = activityType;
        this.assignee = assignee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
    }
    return ProcessHistory;
}());
exports.ProcessHistory = ProcessHistory;
