import {ProcessDefinitionElement} from '../../shared/domain/process-definition-element';
import {ProcessDefinition} from '../../shared/domain/process-definition';
import {ProcessFormVariable} from '../../shared/form/process-form-variable';

export class ProcessFilterForm {
  private _processInstanceId: string;
  private _processDefinitionElement: ProcessDefinitionElement;
  private _processDefinition: ProcessDefinition;
  private _variablesToFilter: ProcessFormVariable[];


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

  get variablesToFilter(): ProcessFormVariable[] {
    return this._variablesToFilter;
  }

  set variablesToFilter(value: ProcessFormVariable[]) {
    this._variablesToFilter = value;
  }

  get processInstanceId(): string {
    return this._processInstanceId;
  }

  set processInstanceId(value: string) {
    this._processInstanceId = value;
  }
}
