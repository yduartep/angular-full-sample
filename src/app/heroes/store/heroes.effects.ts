import {Injectable} from '@angular/core';

// RxJs
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// NgRx
import {
  AddHero, AddHeroError, AddHeroSuccess,
  GetAllHeroesError, GetAllHeroesSuccess,
  GetHero, GetHeroError, GetHeroSuccess,
  RemoveHero, RemoveHeroError, RemoveHeroSuccess,
  UpdateHero, UpdateHeroError, UpdateHeroSuccess
} from './heroes.actions';
import {Actions, Effect} from '@ngrx/effects';
import * as heroActions from './heroes.actions';

// services
import {HeroService} from '../shared/hero.service';
import {Hero} from '../shared/hero';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions,
              private service: HeroService) {
  }

  @Effect()
  getAllHeroes$: Observable<Action> = this.actions$
    .ofType(heroActions.GET_HEROES)
    .switchMap(() => this.service.findAll())
    .map(heroes => new GetAllHeroesSuccess(heroes))
    .catch((err) => [new GetAllHeroesError(err)]);

  @Effect()
  getHero$ = this.actions$
    .ofType(heroActions.GET_HERO)
    .map((action: GetHero) => action.payload)
    .switchMap(id => this.service.findById(id))
    .map(hero => new GetHeroSuccess(hero))
    .catch((err) => [new GetHeroError(err)]);

  @Effect()
  updateHero$ = this.actions$
    .ofType(heroActions.UPDATE_HERO)
    .map((action: UpdateHero) => action.payload)
    .switchMap(hero => this.service.update('id', hero))
    .map(() => new UpdateHeroSuccess())
    .catch((err) => [new UpdateHeroError(err)]);

  @Effect()
  createHero$ = this.actions$
    .ofType(heroActions.CREATE_HERO)
    .map((action: AddHero) => action.payload)
    .switchMap(newHero => this.service.insert(newHero))
    .map((response) => new AddHeroSuccess(response.id))
    .catch((err) => [new AddHeroError(err)]);

  @Effect()
  removeHero$ = this.actions$
    .ofType(heroActions.DELETE_HERO)
    .map((action: RemoveHero) => action.payload)
    .switchMap(id => this.service.delete(id))
    .map((hero: Hero) => new RemoveHeroSuccess(hero))
    .catch((err) => [new RemoveHeroError(err)]);
}
