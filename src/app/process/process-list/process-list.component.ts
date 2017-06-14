import {Component, Inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {fadeInAnimation} from '../../_animations/index';
// models
import {Process} from '../../shared/domain/process';
import {ProcessDefinition} from '../../shared/domain/process-definition';
import {ProcessDefinitionElement} from '../../shared/domain/process-definition-element';
import {ProcessFilterForm} from './process-filter-form';
// services
import {ProcessService} from '../../shared/service/process.service';
import {ProcessDefinitionService} from '../shared/process-definition.service';
import {LoggerService} from '../../core/services/logger.service';
import {MessageService} from '../../modal-message/message.service';
import {ProcessFilter} from '../shared/process-filter';
import {ProcessFormVariable} from '../../shared/form/process-form-variable';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],
  providers: [DatePipe],
  // attach the fade in animation to the host (root) element of this component
  host: {'[@fadeInAnimation]': ''}
})
export class ProcessListComponent implements OnInit {
  public isRequesting = false;
  private _data: Process[];
  private _processDefinitionElements: ProcessDefinitionElement[];
  private _processFilterForm: ProcessFilterForm = new ProcessFilterForm();
  processDefinitionOptions: Array<any>;

  constructor(@Inject('LoggerService') private loggerService: LoggerService,
              private processService: ProcessService,
              private processDefinitionService: ProcessDefinitionService,
              private messageService: MessageService,
              private datepipe: DatePipe) {
    // subscribe to the messages sent from other components
  }

  ngOnInit() {
    this.loggerService.log('... initializing Process list component.');
    this.isRequesting = true;
    this.loadProcessDefinitions();
    this.addDefaultFilters();
  }

  loadProcessDefinitions() {
    this.processDefinitionOptions = [];
    this.processDefinitionService.findAll()
      .subscribe(processDefinitions => {
        this.processDefinitionOptions = processDefinitions.map(processDefinition => {
          return {
            value: processDefinition, label: `${processDefinition.name} (${processDefinition.id} 
          | ${this.datepipe.transform(new Date(processDefinition.deploymentDate), 'dd/MM/yyyy HH:mm:ss')})`
          };
        }).sort((processDefinitionOption1, processDefinitionOption2) => {
          if (processDefinitionOption1.label < processDefinitionOption2.label) {
            return -1;
          }
          if (processDefinitionOption1.label > processDefinitionOption2.label) {
            return 1;
          }
          return 0;
        });
      });
  }

  loadProcessDefinitionElements(processDefinition: ProcessDefinition) {
    this.processDefinitionService.getElements(processDefinition.id)
      .subscribe(processDefinitionElements => {
        this._processDefinitionElements = processDefinitionElements.map(processDefinitionElement => {
          return processDefinitionElement;
        }).sort();
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
    this.addDefaultFilters();
  }

  addVariable() {
    this.processFilterForm.variablesToFilter.push(new ProcessFormVariable('', ''));
  }

  removeVariable(processFilterFormVariable: ProcessFormVariable) {
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

  addDefaultFilters() {
    this.processFilterForm.variablesToFilter.push(new ProcessFormVariable('idBusiness', ''), new ProcessFormVariable('idInvoice', ''));
  }

  get data(): Process[] {
    return this._data;
  }

  set data(value: Process[]) {
    this._data = value;
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
