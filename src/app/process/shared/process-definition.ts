export class ProcessDefinition {
  id: string;
  name: string;
  key: string;
  deploymentId: number;
  initialDeclaredVariables: Array<string>;
  deploymentDate: Date;


  constructor(id: string, name: string, key: string, deploymentId: number, initialDeclaredVariables: Array<string>, deploymentDate: Date) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.deploymentId = deploymentId;
    this.initialDeclaredVariables = initialDeclaredVariables;
    this.deploymentDate = deploymentDate;
  }
}
