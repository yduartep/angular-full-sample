import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from './process.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';

export const processRoutes: Routes = <Routes>[{
  path: '',
  component: ProcessComponent,
  children: [
    { path: '', component: ProcessListComponent },
    { path: 'detail/:id', component: ProcessDetailComponent },
  ]
}];

@NgModule({
    imports: [RouterModule.forChild(processRoutes)],
    exports: [RouterModule]
})
export class ProcessRoutingModule {}

export const processRoutedComponents = [ ProcessComponent, ProcessListComponent, ProcessDetailComponent ];
