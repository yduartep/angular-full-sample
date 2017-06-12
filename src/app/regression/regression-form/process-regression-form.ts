import {ProcessRegressionElementMapping} from '../../shared/domain/process-regression-element-mapping';
import {ProcessFormVariable} from '../../shared/form/process-form-variable';

export class ProcessRegressionForm {

  private _elementMapping: ProcessRegressionElementMapping[] = [new ProcessRegressionElementMapping()];
  private _newProcessDefinitionId: string;
  private _oldProcessDefinitionId: string;
  private _processIntanceIdsToExclude: Array<string> = [];
  private _processIntanceIdsToRegret: Array<string> = [];
  private _variablesToExclude: Array<string> = [];
  private _variablesToInclude: ProcessFormVariable[] = [];


  get elementMapping(): ProcessRegressionElementMapping[] {
    return this._elementMapping;
  }

  set elementMapping(value: ProcessRegressionElementMapping[]) {
    this._elementMapping = value;
  }

  get newProcessDefinitionId(): string {
    return this._newProcessDefinitionId;
  }

  set newProcessDefinitionId(value: string) {
    this._newProcessDefinitionId = value;
  }

  get oldProcessDefinitionId(): string {
    return this._oldProcessDefinitionId;
  }

  set oldProcessDefinitionId(value: string) {
    this._oldProcessDefinitionId = value;
  }

  get processIntanceIdsToExclude(): Array<string> {
    return this._processIntanceIdsToExclude;
  }

  set processIntanceIdsToExclude(value: Array<string>) {
    this._processIntanceIdsToExclude = value;
  }

  get processIntanceIdsToRegret(): Array<string> {
    return this._processIntanceIdsToRegret;
  }

  set processIntanceIdsToRegret(value: Array<string>) {
    this._processIntanceIdsToRegret = value;
  }

  get variablesToExclude(): Array<string> {
    return this._variablesToExclude;
  }

  set variablesToExclude(value: Array<string>) {
    this._variablesToExclude = value;
  }

  get variablesToInclude(): ProcessFormVariable[] {
    return this._variablesToInclude;
  }

  set variablesToInclude(value: ProcessFormVariable[]) {
    this._variablesToInclude = value;
  }
}
