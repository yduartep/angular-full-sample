import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { heroesRoutedComponents, HeroesRoutingModule } from './heroes-routing.module';
import { HeroService } from './shared/hero.service';
import { DataTableModule } from 'angular2-datatable';

@NgModule({
  imports: [
    SharedModule,
    HeroesRoutingModule,
    DataTableModule
  ],
  declarations: [heroesRoutedComponents],
  providers: [HeroService]
})
export class HeroesModule { }
