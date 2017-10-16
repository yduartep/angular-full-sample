import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {heroesRoutedComponents, HeroesRoutingModule} from './heroes-routing.module';
import {HeroService} from './shared/hero.service';

@NgModule({
  imports: [
    SharedModule,
    HeroesRoutingModule
  ],
  declarations: [heroesRoutedComponents],
  providers: [
    HeroService
  ]
})
export class HeroesModule {
}
