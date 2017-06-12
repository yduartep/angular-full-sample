import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { regressionRoutedComponents, RegressionRoutingModule } from './regression-routing.module';
import { DataTableModule } from 'angular2-datatable';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {ProcessService} from '../shared/service/process.service';
import {ProcessDefinitionService} from '../process/shared/process-definition.service';
import {ProcessHistoryService} from '../process/shared/processHistory.service';


@NgModule({
  imports: [
    SharedModule,
    RegressionRoutingModule,
    DataTableModule,
    PrettyJsonModule
  ],
  declarations: [regressionRoutedComponents],
  providers: [
    ProcessService,
    ProcessDefinitionService,
    ProcessHistoryService
  ]
})
export class RegressionModule { }
