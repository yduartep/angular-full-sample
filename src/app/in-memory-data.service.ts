import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const process = [
      {executionId: '1', processInstanceId: '1', processKey: '1', processDefinitionId: '1',
        diagramURL: 'imagen_url', tenantId: '', activity: '', tasks: [], processVariables: ''},
      {executionId: '2', processInstanceId: '2', processKey: '2', processDefinitionId: '2',
        diagramURL: 'imagen_url', tenantId: '', activity: '', tasks: [], processVariables: ''},
      {executionId: '3', processInstanceId: '3', processKey: '3', processDefinitionId: '3',
        diagramURL: 'imagen_url', tenantId: '', activity: '', tasks: [], processVariables: ''},
      {executionId: '4', processInstanceId: '4', processKey: '4', processDefinitionId: '4',
        diagramURL: 'imagen_url', tenantId: '', activity: '', tasks: [], processVariables: ''},
      {executionId: '5', processInstanceId: '5', processKey: '5', processDefinitionId: '5',
        diagramURL: 'imagen_url', tenantId: '', activity: '', tasks: [], processVariables: ''}
    ];

    return { process };
  }
}
