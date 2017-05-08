import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { VillainsComponent } from './villains.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';

export const villainsRoutes: Routes = <Routes>[{
  path: '',
  component: VillainsComponent,
  children: [
    { path: '', component: VillainListComponent },
    { path: 'detail/:id', component: VillainDetailComponent }
  ]
}];

@NgModule({
    imports: [RouterModule.forChild(villainsRoutes)],
    exports: [RouterModule]
})
export class VillainsRoutingModule {}

export const villainsRoutedComponents = [ VillainsComponent, VillainListComponent, VillainDetailComponent ];
