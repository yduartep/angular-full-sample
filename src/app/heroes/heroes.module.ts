import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {heroesRoutedComponents, HeroesRoutingModule} from './heroes-routing.module';
import {HeroService} from './shared/hero.service';
import {StoreModule} from '@ngrx/store';
import * as heroReducer from './heroes.reducers';
import {EffectsModule} from '@ngrx/effects';
import {HeroEffects} from './heroes.effects';

@NgModule({
  imports: [
    SharedModule,
    HeroesRoutingModule,
    StoreModule.forFeature('heroes', heroReducer.reducer),
    EffectsModule.forRoot([HeroEffects]),
  ],
  declarations: [heroesRoutedComponents],
  providers: [
    HeroService
  ]
})
export class HeroesModule {
}
