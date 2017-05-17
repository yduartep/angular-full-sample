import {Task} from './task';
import {Activity} from './activity';

export class Process {
  executionId: string;
  processInstanceId: string;
  processKey: string;
  processDefinitionId: string;
  diagramURL: string;
  tenantId: string;
  latestActivity: Activity;
  tasks: Array<Task>;
  processVariables: Map<string, any>;

  constructor(executionId: string, processInstanceId: string, processKey: string, processDefinitionId: string,
              diagramURL: string, tenantId: string, latestActivity: Activity,
              tasks: Array<Task>, processVariables: Map<string, any>) {
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
}
