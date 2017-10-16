import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {villainsRoutedComponents, VillainsRoutingModule} from './villains-routing.module';
import {VillainService} from './shared/villain.service';
import {VillainSearchComponent} from './villain-search/villain-search.component';

@NgModule({
  imports: [
    SharedModule,
    VillainsRoutingModule
  ],
  declarations: [villainsRoutedComponents, VillainSearchComponent],
  providers: [VillainService]
})
export class VillainsModule {
}
