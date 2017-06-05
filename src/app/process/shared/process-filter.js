"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessFilter = (function () {
    function ProcessFilter(nodeKey, processDefinitionId, variablesToFilter) {
        this.nodeKey = nodeKey;
        this.processDefinitionId = processDefinitionId;
        this.variablesToFilter = variablesToFilter;
    }
    return ProcessFilter;
}());
exports.ProcessFilter = ProcessFilter;
