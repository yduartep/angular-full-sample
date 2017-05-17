import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { processRoutedComponents, ProcessRoutingModule } from './process-routing.module';
import { ProcessService } from './shared/process.service';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  imports: [
    SharedModule,
    ProcessRoutingModule,
    DataTableModule
  ],
  declarations: [processRoutedComponents],
  providers: [
    ProcessService
  ]
})
export class ProcessModule { }
