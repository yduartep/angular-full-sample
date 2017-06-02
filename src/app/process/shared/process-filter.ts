export class ProcessFilter {
  nodeKey: string;
  processDefinitionId: string;
  variablesToFilter: {};


  constructor(nodeKey: string, processDefinitionId: string, variablesToFilter: {}) {
    this.nodeKey = nodeKey;
    this.processDefinitionId = processDefinitionId;
    this.variablesToFilter = variablesToFilter;
  }

}
