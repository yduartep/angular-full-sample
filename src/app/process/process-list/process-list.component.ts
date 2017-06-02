import {Component, Inject, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../_animations/index';
// models
import {Process} from '../shared/process';
import {ProcessDefinition} from '../shared/process-definition';
import {ProcessDefinitionElement} from '../shared/process-definition-element';
import {ProcessFilterForm} from './process-filter-form';
// services
import {ProcessService} from '../shared/process.service';
import {ProcessDefinitionService} from '../shared/process-definition.service';
import {LoggerService} from '../../core/services/logger.service';
import {MessageService} from '../../modal-message/message.service';
import {ProcessFilter} from '../shared/process-filter';
import {ProcessFilterFormVariable} from './process-filter-form-variable';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: {'[@fadeInAnimation]': ''}
})
export class ProcessListComponent implements OnInit {
  public isRequesting = false;
  private _data: Process[];
  private _processDefinitions: ProcessDefinition[];
  private _processDefinitionElements: ProcessDefinitionElement[];
  private _processFilterForm: ProcessFilterForm = new ProcessFilterForm();

  constructor(@Inject('LoggerService') private loggerService: LoggerService,
              private processService: ProcessService,
              private processDefinitionService: ProcessDefinitionService,
              private messageService: MessageService) {
    // subscribe to the messages sent from other components
  }

  ngOnInit() {
    this.loggerService.log('... initializing Process list component.');
    this.isRequesting = true;
    this.loadProcessDefinitions();
    this.findAll();
  }

  findAll() {
    this.processService.findAll()
      .subscribe(processes => {
        this._data = processes.map(process => {
          return process;
        });
      });
  }

  loadProcessDefinitions() {
    this.processDefinitionService.findAll()
      .subscribe(processDefinitions => {
        this._processDefinitions = processDefinitions.map(processDefinition => {
          return processDefinition;
        });
      });
  }

  loadProcessDefinitionElements(processDefinition: ProcessDefinition) {
    this.processDefinitionService.getElements(processDefinition.id)
      .subscribe(processDefinitionElements => {
        this._processDefinitionElements = processDefinitionElements.map(processDefinitionElement => {
          return processDefinitionElement;
        });
      });
  }

  filter() {
    if (this.processFilterForm.processInstanceId) {
      this.processService.findById(this.processFilterForm.processInstanceId).subscribe(process => {
        this.data = [process];
      });
    } else {
      const processVariableToFilterMap = {};
      this.processFilterForm.variablesToFilter.forEach(processVariableToFilter =>
        processVariableToFilterMap[processVariableToFilter.variableKey] = processVariableToFilter.variableValue);

      const processFilter = new ProcessFilter(this.processFilterForm.processDefinitionElement ?
          this.processFilterForm.processDefinitionElement.key : undefined,
        this.processFilterForm.processDefinition ? this.processFilterForm.processDefinition.id : undefined, processVariableToFilterMap);

      this.processService.filter(processFilter)
        .subscribe(processes => {
          this._data = processes;
        });
    }
  }

  reset() {
    this.processFilterForm = new ProcessFilterForm();
    this.processDefinitionElements = null;
    this.findAll();
  }

  addVariable() {
    this.processFilterForm.variablesToFilter.push(new ProcessFilterFormVariable('', ''));
  }

  removeVariable(processFilterFormVariable: ProcessFilterFormVariable) {
    const index = this.processFilterForm.variablesToFilter.indexOf(processFilterFormVariable, 0);
    this.processFilterForm.variablesToFilter.splice(index, 1);
  }

  isFormEnabled() {
    return this.processFilterForm.processInstanceId ||
      ((this.processFilterForm.processDefinition && !this.isAddNewVariableDisabled()) ||
      (this.processFilterForm.variablesToFilter.length > 0 && !this.isAddNewVariableDisabled()));
  }

  isAddNewVariableDisabled() {
    return this.processFilterForm.variablesToFilter.length > 0 &&
      this.processFilterForm.variablesToFilter.find(processVariable => !processVariable.variableKey ||
      !processVariable.variableValue);
  }


  get data(): Process[] {
    return this._data;
  }

  set data(value: Process[]) {
    this._data = value;
  }

  get processDefinitions(): ProcessDefinition[] {
    return this._processDefinitions;
  }

  set processDefinitions(value: ProcessDefinition[]) {
    this._processDefinitions = value;
  }

  get processDefinitionElements(): ProcessDefinitionElement[] {
    return this._processDefinitionElements;
  }

  set processDefinitionElements(value: ProcessDefinitionElement[]) {
    this._processDefinitionElements = value;
  }

  get processFilterForm(): ProcessFilterForm {
    return this._processFilterForm;
  }

  set processFilterForm(value: ProcessFilterForm) {
    this._processFilterForm = value;
  }
}
