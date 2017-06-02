import {ProcessDefinitionElement} from '../shared/process-definition-element';
import {ProcessDefinition} from '../shared/process-definition';
import {ProcessFilterFormVariable} from './process-filter-form-variable';

export class ProcessFilterForm {
  private _processInstanceId: string;
  private _processDefinitionElement: ProcessDefinitionElement;
  private _processDefinition: ProcessDefinition;
  private _variablesToFilter: ProcessFilterFormVariable[];


  constructor() {
    this._variablesToFilter = [];
  }

  get processDefinitionElement(): ProcessDefinitionElement {
    return this._processDefinitionElement;
  }

  set processDefinitionElement(value: ProcessDefinitionElement) {
    this._processDefinitionElement = value;
  }

  get processDefinition(): ProcessDefinition {
    return this._processDefinition;
  }

  set processDefinition(value: ProcessDefinition) {
    this._processDefinition = value;
  }

  get variablesToFilter(): ProcessFilterFormVariable[] {
    return this._variablesToFilter;
  }

  set variablesToFilter(value: ProcessFilterFormVariable[]) {
    this._variablesToFilter = value;
  }

  get processInstanceId(): string {
    return this._processInstanceId;
  }

  set processInstanceId(value: string) {
    this._processInstanceId = value;
  }
}
