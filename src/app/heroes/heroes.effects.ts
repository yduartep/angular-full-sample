import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {HeroService} from './shared/hero.service';
import * as heroActions from './heroes.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {
  AddHero, AddHeroError, AddHeroSuccess, GetAllHeroesError,
  GetAllHeroesSuccess,
  GetHero, GetHeroError, GetHeroSuccess,
  RemoveHero, RemoveHeroError, RemoveHeroSuccess, UpdateHero, UpdateHeroError, UpdateHeroSuccess
} from './heroes.actions';
import {Hero} from './shared/hero';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions,
              private svc: HeroService) {
  }

  @Effect()
  getAllHeroes$: Observable<Action> = this.actions$
    .ofType(heroActions.GET_HEROES)
    .switchMap(() => this.svc.findAll())
    .map(heroes => new GetAllHeroesSuccess(heroes))
    .catch((err) => [new GetAllHeroesError(err)]);

  @Effect()
  getHero$ = this.actions$
    .ofType(heroActions.GET_HERO)
    .map((action: GetHero) => action.payload)
    .switchMap(id => this.svc.findById(id))
    .map(hero => new GetHeroSuccess(hero))
    .catch((err) => [new GetHeroError(err)]);

  @Effect()
  updateHero$ = this.actions$
    .ofType(heroActions.UPDATE_HERO)
    .map((action: UpdateHero) => action.payload)
    .switchMap(hero => this.svc.update('id', hero))
    .map(() => new UpdateHeroSuccess())
    .catch((err) => [new UpdateHeroError(err)]);

  @Effect()
  createHero$ = this.actions$
    .ofType(heroActions.CREATE_HERO)
    .map((action: AddHero) => action.payload)
    .switchMap(newHero => this.svc.insert(newHero))
    .map((response) => new AddHeroSuccess(response.id))
    .catch((err) => [new AddHeroError(err)]);

  @Effect()
  removeHero$ = this.actions$
    .ofType(heroActions.DELETE_HERO)
    .map((action: RemoveHero) => action.payload)
    .switchMap(id => this.svc.delete(id))
    .map((hero: Hero) => new RemoveHeroSuccess(hero))
    .catch((err) => [new RemoveHeroError(err)]);
}
