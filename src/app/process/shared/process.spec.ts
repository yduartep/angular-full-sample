import { Process } from './process';
import {Activity} from './activity';
import {Task} from './task';

describe('Process', () => {
  it('should create an instance with id', () => {
    const activity = new Activity('idTask', 'name', new Date());
    const tasks = Array<Task>();
    const processVariables = new Map<string, any>();
    expect(new Process('executionId', 'processInstanceId 1', 'processKey', 'processDefinitionId',
      'diagramURL', 'tenantId', activity, tasks, processVariables)).toBeTruthy();
  });

  it('should create an instance with all values', () => {
    const activity = new Activity('idTask', 'name', new Date());
    const tasks = Array<Task>();
    const processVariables = new Map<string, any>();
    expect(new Process('executionId', 'processInstanceId 1', 'processKey', 'processDefinitionId',
      'diagramURL', 'tenantId', activity, tasks, processVariables)).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const executionId = 'executionId', processInstanceId = 'processInstanceId 1', processDefinitionId = 'processDefinitionId';
    const activity = new Activity('idTask', 'name', new Date());
    const tasks = Array<Task>();
    const processVariables = new Map<string, any>();
    const process = new Process('executionId', 'processInstanceId 1', 'processKey', 'processDefinitionId',
      'diagramURL', 'tenantId', activity, tasks, processVariables);
    expect(process.executionId).toBe(executionId);
    expect(process.processInstanceId).toBe(processInstanceId);
    expect(process.processDefinitionId).toBe(processDefinitionId);
  });
});
