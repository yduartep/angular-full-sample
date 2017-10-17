import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {HeroesComponent} from './heroes.component';
import {HeroListComponent} from './hero-list/hero-list.component';
import {HeroCreateComponent} from './hero-create/hero-create.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroEditComponent} from './hero-edit/hero-edit.component';

export const heroesRoutes: Routes = <Routes>[{
  path: '',
  component: HeroesComponent,
  children: [
    {path: '', component: HeroListComponent},
    {path: 'detail/:id', component: HeroDetailComponent},
    {path: 'create', component: HeroCreateComponent},
    {path: 'edit/:id', component: HeroEditComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {
}

export const heroesRoutedComponents = [
  HeroesComponent,
  HeroListComponent,
  HeroDetailComponent,
  HeroCreateComponent,
  HeroEditComponent
];
