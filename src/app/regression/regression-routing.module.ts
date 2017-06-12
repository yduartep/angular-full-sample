import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RegressionComponent} from './regression.component';
import {RegressionFormComponent} from './regression-form/regression-form.component';
import {ProcessDefinitionImageComponent} from '../process/process-definition/process-definition-image.component';

export const regressionRoutes: Routes = <Routes>[{
  path: '',
  component: RegressionComponent,
  children: [
    {
      path: '',
      component: RegressionFormComponent,
      children: [
        {path: 'definition/:id', component: ProcessDefinitionImageComponent},
      ]
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forChild(regressionRoutes)],
  exports: [RouterModule]
})
export class RegressionRoutingModule {
}

export const regressionRoutedComponents = [RegressionComponent,
  RegressionFormComponent];
