import {Action} from '@ngrx/store';
import {Villain} from '../shared/villain';

export const GET_VILLAINS = '[ALL] Villains';
export const GET_VILLAINS_SUCCESS = '[ALL] Villains Success';
export const GET_VILLAINS_ERROR = '[ALL] Villains Error';

export const GET_VILLAIN = '[GET] Villain';
export const GET_VILLAIN_SUCCESS = '[GET] Villains Success';
export const GET_VILLAIN_ERROR = '[GET] Villains Error';

export const DELETE_VILLAIN = '[DELETE] Villain';
export const DELETE_VILLAIN_SUCCESS = '[DELETE] Villain Success';
export const DELETE_VILLAIN_ERROR = '[DELETE] Villain Error';

/****************************************
 * GET all the villains
 ****************************************/
export class GetAllVillains implements Action {
  readonly type = GET_VILLAINS;
}

export class GetAllVillainsSuccess implements Action {
  readonly type = GET_VILLAINS_SUCCESS;

  constructor(public payload: Villain[]) {
  }
}

export class GetAllVillainsError implements Action {
  readonly type = GET_VILLAINS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET villain by id
 ****************************************/
export class GetVillain implements Action {
  readonly type = GET_VILLAIN;

  constructor(public payload: number) {
  }
}

export class GetVillainSuccess implements Action {
  readonly type = GET_VILLAIN_SUCCESS;

  constructor(public payload: Villain) {
  }
}

export class GetVillainError implements Action {
  readonly type = GET_VILLAIN_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * REMOVE a villain by id
 ****************************************/
export class RemoveVillain implements Action {
  readonly type = DELETE_VILLAIN;

  constructor(public payload: number) {
  }
}

export class RemoveVillainSuccess implements Action {
  readonly type = DELETE_VILLAIN_SUCCESS;

  constructor(public payload: Villain) {
  }
}

export class RemoveVillainError implements Action {
  readonly type = DELETE_VILLAIN_ERROR;

  constructor(public payload: Error) {
  }
}
