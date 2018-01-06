import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {villainsRoutedComponents, VillainsRoutingModule} from './villains-routing.module';
import {VillainService} from './shared/villain.service';
import {VillainSearchComponent} from './villain-search/villain-search.component';

// NgRx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {VillainEffects} from './store/villains.effects';
import * as heroReducer from './store/villains.reducers';

export const reducers: ActionReducerMap<any> = {
  villains: heroReducer.reducer
};

@NgModule({
  imports: [
    SharedModule,
    VillainsRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VillainEffects])
  ],
  declarations: [villainsRoutedComponents, VillainSearchComponent],
  providers: [VillainService]
})
export class VillainsModule {
}
