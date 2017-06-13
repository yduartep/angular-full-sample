import {Component, Inject, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../_animations/index';
// models
import {Process} from '../../shared/domain/process';
import {ProcessDefinition} from '../../shared/domain/process-definition';
// services
import {LoggerService} from '../../core/services/logger.service';
import {MessageService} from '../../modal-message/message.service';
import {ProcessRegressionForm} from './process-regression-form';
import {Observable} from 'rxjs/Observable';
import {ProcessFormVariable} from '../../shared/form/process-form-variable';
import {ProcessService} from '../../shared/service/process.service';
import {ProcessDefinitionService} from '../../process/shared/process-definition.service';
import {ProcessDefinitionElement} from '../../shared/domain/process-definition-element';
import {ProcessRegression} from '../../shared/domain/process-regression';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-regression-form',
  templateUrl: './regression-form.component.html',
  styleUrls: ['./regression-form.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: {'[@fadeInAnimation]': ''}
})
export class RegressionFormComponent implements OnInit {
  public isRequesting = false;
  private _data: Process[];
  private _processDefinitions: ProcessDefinition[];
  private _processDefinitionElementsSource: ProcessDefinitionElement[];
  private _processDefinitionElementsTarget: ProcessDefinitionElement[];
  private _processRegressionForm = new ProcessRegressionForm();

  constructor(@Inject('LoggerService') private loggerService: LoggerService,
              private processService: ProcessService,
              private processDefinitionService: ProcessDefinitionService,
              private messageService: MessageService,
              private router: Router) {
    // subscribe to the messages sent from other components
  }

  ngOnInit() {
    this.loggerService.log('... initializing Process Regression component.');
    this.isRequesting = true;
    this.loadProcessDefinitions();
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

  loadProcessDefinitionElementsSource(processDefinitionId: string) {
    this.loadProcessDefinitionElements(processDefinitionId)
      .subscribe(processDefinitionElements => {
        this._processDefinitionElementsSource = processDefinitionElements.map(processDefinitionElement => {
          return processDefinitionElement;
        });
      });
  }

  loadProcessDefinitionElementsTarget(processDefinitionId: string) {
    this.loadProcessDefinitionElements(processDefinitionId)
      .subscribe(processDefinitionElements => {
        this._processDefinitionElementsTarget = processDefinitionElements.map(processDefinitionElement => {
          return processDefinitionElement;
        });
      });
  }

  private loadProcessDefinitionElements(processDefinitionId: string): Observable<ProcessDefinitionElement[]> {
    return this.processDefinitionService.getElements(processDefinitionId);
  }

  doRegression() {
    const confirmation = window.confirm('Are you sure you want to process with the regression? It´s a very risky process');
    if (confirmation) {

      const variablesToIncludeMap = {};
      this._processRegressionForm.variablesToInclude.forEach(variablesToInclude =>
        variablesToIncludeMap[variablesToInclude.variableKey] = variablesToInclude.variableValue);

      const processRegression = new ProcessRegression(this._processRegressionForm.elementMapping[0] && this._processRegressionForm.elementMapping[0].sourceId ? this._processRegressionForm.elementMapping : null,
        this._processRegressionForm.newProcessDefinitionId, this._processRegressionForm.oldProcessDefinitionId,
        this._processRegressionForm.processIntanceIdsToExclude, this._processRegressionForm.processIntanceIdsToRegret,
        this._processRegressionForm.variablesToExclude, variablesToIncludeMap);

      this.processService.regression(processRegression).subscribe(((process: Process) => {
        this.router.navigate(['/process/detail/' + process.processInstanceId]);
      }));
    }
  }

  reset() {
    this._processRegressionForm = new ProcessRegressionForm();
    this._processDefinitionElementsSource = null;
    this._processDefinitionElementsTarget = null;
  }


  addVariableToInclude() {
    this._processRegressionForm.variablesToInclude.push(new ProcessFormVariable('', ''));
  }

  removeVariableToInclude(processFormVariable: ProcessFormVariable) {
    const index = this._processRegressionForm.variablesToInclude.indexOf(processFormVariable, 0);
    this._processRegressionForm.variablesToInclude.splice(index, 1);
  }

  isAddNewVariableToIncludeDisabled() {
    return this._processRegressionForm.variablesToInclude.length > 0 &&
      this._processRegressionForm.variablesToInclude.find(processVariable => !processVariable.variableKey ||
      !processVariable.variableValue);
  }

  addVariableToExclude() {
    this._processRegressionForm.variablesToExclude.push('');
  }

  removeVariableToExclude(variable: string) {
    const index = this._processRegressionForm.variablesToExclude.indexOf(variable, 0);
    this._processRegressionForm.variablesToExclude.splice(index, 1);
  }

  isAddNewVariableToExcludeDisabled() {
    return this._processRegressionForm.variablesToExclude.length > 0 &&
      this._processRegressionForm.variablesToExclude.find(processVariable => !processVariable);
  }

  isFormEnabled() {
    return this._processRegressionForm.newProcessDefinitionId && this._processRegressionForm.oldProcessDefinitionId &&
      (
        (this._processRegressionForm.elementMapping[0].sourceId && this._processRegressionForm.elementMapping[0].targetId) ||
        (!this._processRegressionForm.elementMapping[0].sourceId && !this._processRegressionForm.elementMapping[0].targetId)
      ) &&
      !this.isAddNewVariableToIncludeDisabled() &&
      !this.isAddNewVariableToExcludeDisabled();
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


  get processDefinitionElementsSource(): ProcessDefinitionElement[] {
    return this._processDefinitionElementsSource;
  }

  set processDefinitionElementsSource(value: ProcessDefinitionElement[]) {
    this._processDefinitionElementsSource = value;
  }

  get processDefinitionElementsTarget(): ProcessDefinitionElement[] {
    return this._processDefinitionElementsTarget;
  }

  set processDefinitionElementsTarget(value: ProcessDefinitionElement[]) {
    this._processDefinitionElementsTarget = value;
  }


  get processRegressionForm(): ProcessRegressionForm {
    return this._processRegressionForm;
  }

  set processRegressionForm(value: ProcessRegressionForm) {
    this._processRegressionForm = value;
  }
}
