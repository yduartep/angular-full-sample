import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { villainsRoutedComponents, VillainsRoutingModule } from './villains-routing.module';
import { VillainService } from './shared/villain.service';
import { DataTableModule } from 'angular2-datatable';
import { VillainSearchComponent } from './villain-search/villain-search.component'

@NgModule({
  imports: [
    SharedModule,
    VillainsRoutingModule,
    DataTableModule
  ],
  declarations: [villainsRoutedComponents, VillainSearchComponent],
  providers: [VillainService]
})
export class VillainsModule { }
