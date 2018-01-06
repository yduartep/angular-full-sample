import {Injectable} from '@angular/core';
// RxJs
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// NgRx
import * as villainActions from './villains.actions';
import {
  GetAllVillainsError,
  GetAllVillainsSuccess,
  GetVillain,
  GetVillainError,
  GetVillainSuccess,
  RemoveVillain,
  RemoveVillainError,
  RemoveVillainSuccess
} from './villains.actions';
import {Actions, Effect} from '@ngrx/effects';

// services
import {VillainService} from '../shared/villain.service';
import {Villain} from '../shared/villain';

@Injectable()
export class VillainEffects {
  constructor(private actions$: Actions,
              private service: VillainService) {
  }

  @Effect()
  getAllVillains$: Observable<Action> = this.actions$
    .ofType(villainActions.GET_VILLAINS)
    .switchMap(() => this.service.findAll())
    .map(villains => new GetAllVillainsSuccess(villains))
    .catch((err) => [new GetAllVillainsError(err)]);

  @Effect()
  getVillain$ = this.actions$
    .ofType(villainActions.GET_VILLAIN)
    .map((action: GetVillain) => action.payload)
    .switchMap(id => this.service.findById(id))
    .map(villain => new GetVillainSuccess(villain))
    .catch((err) => [new GetVillainError(err)]);

  @Effect()
  removeVillain$ = this.actions$
    .ofType(villainActions.DELETE_VILLAIN)
    .map((action: RemoveVillain) => action.payload)
    .switchMap(id => this.service.delete(id))
    .map((villain: Villain) => new RemoveVillainSuccess(villain))
    .catch((err) => [new RemoveVillainError(err)]);
}
