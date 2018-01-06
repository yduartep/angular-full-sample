import * as heroActions from './heroes.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Hero} from '../shared/hero';

export interface State {
  data: Hero[];
  selected: Hero;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
    /*************************
     * GET all heroes actions
     ************************/
    case heroActions.GET_HEROES:
      return {...state, action: heroActions.GET_HEROES, done: false};
    case heroActions.GET_HEROES_SUCCESS:
      return {...state, data: action.payload, done: true};
    case heroActions.GET_HEROES_ERROR:
      return {...state, done: false, error: action.payload};

    /*************************
     * GET hero by id actions
     ************************/
    case heroActions.GET_HERO:
      return {...state, action: heroActions.GET_HERO, done: false};
    case heroActions.GET_HERO_SUCCESS:
      return {...state, selected: action.payload, done: true};
    case heroActions.GET_HERO_ERROR:
      return {...state, selected: null, done: false, error: action.payload};

    /*************************
     * CREATE hero actions
     ************************/
    case heroActions.CREATE_HERO:
      return {...state, selected: action.payload, action: heroActions.CREATE_HERO, done: false};
    case heroActions.CREATE_HERO_SUCCESS: {
      const newHero = {...state.selected, id: action.payload};
      const data = [...state.data, newHero];
      return {...state, data, selected: null, done: true};
    }
    case heroActions.CREATE_HERO_ERROR:
      return {...state, selected: null, done: false, error: action.payload};

    /*************************
     * UPDATE hero actions
     ************************/
    case heroActions.UPDATE_HERO:
      return {...state, selected: action.payload, action: heroActions.UPDATE_HERO, done: false};
    case heroActions.UPDATE_HERO_SUCCESS: {
      const index = state.data.findIndex(h => h.id === state.selected.id);
      if (index >= 0) {
        const data = [...state.data.slice(0, index), state.selected, ...state.data.slice(index + 1)];
        return {...state, data, done: true};
      }
      return state;
    }
    case heroActions.UPDATE_HERO_ERROR:
      return {...state, done: false, error: action.payload};

    /*************************
     * DELETE hero actions
     ************************/
    case heroActions.DELETE_HERO: {
      const selected = state.data.find(h => h.id === action.payload);
      return {...state, selected, action: heroActions.DELETE_HERO, done: false};
    }
    case heroActions.DELETE_HERO_SUCCESS: {
      const data = state.data.filter(h => h.id !== state.selected.id);
      return {...state, data, selected: null, done: true};
    }
    case heroActions.DELETE_HERO_ERROR:
      return {...state, selected: null, done: false, error: action.payload};
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getHeroState = createFeatureSelector<State>('heroes');
export const getAllHeroes = createSelector(getHeroState, (state: State) => state.data);
export const getHero = createSelector(getHeroState, (state: State) => {
  if (state.action === heroActions.GET_HERO && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getHeroState, (state: State) => state.action === heroActions.DELETE_HERO && state.done);
export const isCreated = createSelector(getHeroState, (state: State) => state.action === heroActions.CREATE_HERO && state.done);
export const isUpdated = createSelector(getHeroState, (state: State) => state.action === heroActions.UPDATE_HERO && state.done);

export const getDeleteError = createSelector(getHeroState, (state: State) => {
  return state.action === heroActions.DELETE_HERO ? state.error : null;
});
export const getCreateError = createSelector(getHeroState, (state: State) => {
  return state.action === heroActions.CREATE_HERO ? state.error : null;
});
export const getUpdateError = createSelector(getHeroState, (state: State) => {
  return state.action === heroActions.UPDATE_HERO ? state.error : null;
});
export const getHeroesError = createSelector(getHeroState, (state: State) => {
  return state.action === heroActions.GET_HEROES || state.action === heroActions.GET_HERO ? state.error : null;
});
export const getHeroError = createSelector(getHeroState, (state: State) => {
  return state.action === heroActions.GET_HERO ? state.error : null;
});
