import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {heroesRoutedComponents, HeroesRoutingModule} from './heroes-routing.module';

// services
import {HeroService} from './shared/hero.service';

// NgRx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HeroEffects} from './store/heroes.effects';
import * as heroReducer from './store/heroes.reducers';

export const reducers: ActionReducerMap<any> = {
  heroes: heroReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    HeroesRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([HeroEffects])
  ],
  declarations: [heroesRoutedComponents],
  providers: [
    HeroService
  ]
})
export class HeroesModule {
}
