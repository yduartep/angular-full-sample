import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { processRoutedComponents, ProcessRoutingModule } from './process-routing.module';
import { ProcessService } from './shared/process.service';
import { ProcessHistoryService } from './shared/processHistory.service';
import { DataTableModule } from 'angular2-datatable';
import {PrettyJsonModule} from 'angular2-prettyjson';


@NgModule({
  imports: [
    SharedModule,
    ProcessRoutingModule,
    DataTableModule,
    PrettyJsonModule
  ],
  declarations: [processRoutedComponents],
  providers: [
    ProcessService,
    ProcessHistoryService
  ]
})
export class ProcessModule { }
