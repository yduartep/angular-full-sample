import {Action} from '@ngrx/store';
import {Hero} from '../shared/hero';

export const GET_HEROES = '[ALL] Heroes';
export const GET_HEROES_SUCCESS = '[ALL] Heroes Success';
export const GET_HEROES_ERROR = '[ALL] Heroes Error';

export const GET_HERO = '[GET] Hero';
export const GET_HERO_SUCCESS = '[GET] Heroes Success';
export const GET_HERO_ERROR = '[GET] Heroes Error';

export const CREATE_HERO = '[CREATE] Hero';
export const CREATE_HERO_SUCCESS = '[CREATE] Hero Success';
export const CREATE_HERO_ERROR = '[CREATE] Hero Error';

export const DELETE_HERO = '[DELETE] Hero';
export const DELETE_HERO_SUCCESS = '[DELETE] Hero Success';
export const DELETE_HERO_ERROR = '[DELETE] Hero Error';

export const UPDATE_HERO = '[UPDATE] Hero';
export const UPDATE_HERO_SUCCESS = '[UPDATE] Hero Success';
export const UPDATE_HERO_ERROR = '[UPDATE] Hero Error';

/****************************************
 * GET all the heroes
 ****************************************/
export class GetAllHeroes implements Action {
  readonly type = GET_HEROES;
}

export class GetAllHeroesSuccess implements Action {
  readonly type = GET_HEROES_SUCCESS;

  constructor(public payload: Hero[]) {
  }
}

export class GetAllHeroesError implements Action {
  readonly type = GET_HEROES_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET hero by id
 ****************************************/
export class GetHero implements Action {
  readonly type = GET_HERO;

  constructor(public payload: number) {
  }
}

export class GetHeroSuccess implements Action {
  readonly type = GET_HERO_SUCCESS;

  constructor(public payload: Hero) {
  }
}

export class GetHeroError implements Action {
  readonly type = GET_HERO_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new hero
 ****************************************/
export class AddHero implements Action {
  readonly type = CREATE_HERO;

  constructor(public payload: Hero) {
  }
}

export class AddHeroSuccess implements Action {
  readonly type = CREATE_HERO_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddHeroError implements Action {
  readonly type = CREATE_HERO_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a hero by id
 ****************************************/
export class RemoveHero implements Action {
  readonly type = DELETE_HERO;

  constructor(public payload: number) {
  }
}

export class RemoveHeroSuccess implements Action {
  readonly type = DELETE_HERO_SUCCESS;

  constructor(public payload: Hero) {
  }
}

export class RemoveHeroError implements Action {
  readonly type = DELETE_HERO_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE hero by id
 ****************************************/
export class UpdateHero implements Action {
  readonly type = UPDATE_HERO;

  constructor(public payload: Hero) {
  }
}

export class UpdateHeroSuccess implements Action {
  readonly type = UPDATE_HERO_SUCCESS;
}

export class UpdateHeroError implements Action {
  readonly type = UPDATE_HERO_ERROR;

  constructor(public payload: Error) {
  }
}
