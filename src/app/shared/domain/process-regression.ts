import {ProcessRegressionElementMapping} from './process-regression-element-mapping';

export class ProcessRegression {

  elementMapping: ProcessRegressionElementMapping[];
  newProcessDefinitionId: string;
  oldProcessDefinitionId: string;
  processIntanceIdsToExclude: Array<string>;
  processIntanceIdsToRegret: Array<string>;
  variablesToExclude: Array<string>;
  variablesToInclude: {};

  constructor(elementMapping: ProcessRegressionElementMapping[], newProcessDefinitionId: string,
              oldProcessDefinitionId: string, processIntanceIdsToExclude: Array<string>,
              processIntanceIdsToRegret: Array<string>, variablesToExclude: Array<string>,
              variablesToInclude: {}) {
    this.elementMapping = elementMapping;
    this.newProcessDefinitionId = newProcessDefinitionId;
    this.oldProcessDefinitionId = oldProcessDefinitionId;
    this.processIntanceIdsToExclude = processIntanceIdsToExclude;
    this.processIntanceIdsToRegret = processIntanceIdsToRegret;
    this.variablesToExclude = variablesToExclude;
    this.variablesToInclude = variablesToInclude;
  }

}
