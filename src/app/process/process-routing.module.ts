import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {ProcessComponent} from './process.component';
import {ProcessListComponent} from './process-list/process-list.component';
import {ProcessDetailComponent} from './process-detail/process-detail.component';
import {ProcessDetailVariablesComponent} from './process-detail/process-detail-variables.component';
import {ProcessDetailTasksComponent} from './process-detail/process-detail-tasks.component';
import {ProcessDetailImageComponent} from './process-detail/process-detail-image.component';

export const processRoutes: Routes = <Routes>[{
  path: '',
  component: ProcessComponent,
  children: [
    {path: '', component: ProcessListComponent},
    {
      path: 'detail/:id',
      component: ProcessDetailComponent,
      children: [
        {path: 'variables', component: ProcessDetailVariablesComponent},
        {path: 'tasks', component: ProcessDetailTasksComponent},
        {path: 'image', component: ProcessDetailImageComponent}
      ]
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(processRoutes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule {
}

export const processRoutedComponents = [ProcessComponent, ProcessListComponent, ProcessDetailComponent,
ProcessDetailVariablesComponent, ProcessDetailImageComponent, ProcessDetailTasksComponent];
