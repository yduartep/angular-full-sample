import * as villainActions from './villains.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Villain} from '../shared/villain';

export interface State {
  data: Villain[];
  selected: Villain;
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
     * GET all villains actions
     ************************/
    case villainActions.GET_VILLAINS:
      return {...state, action: villainActions.GET_VILLAINS, done: false};
    case villainActions.GET_VILLAINS_SUCCESS:
      return {...state, data: action.payload, done: true};
    case villainActions.GET_VILLAINS_ERROR:
      return {...state, done: false, error: action.payload};

    /*************************
     * GET villain by id actions
     ************************/
    case villainActions.GET_VILLAIN:
      return {...state, action: villainActions.GET_VILLAIN, done: false};
    case villainActions.GET_VILLAIN_SUCCESS:
      return {...state, selected: action.payload, done: true};
    case villainActions.GET_VILLAIN_ERROR:
      return {...state, selected: null, done: false, error: action.payload};

    /*************************
     * DELETE villain actions
     ************************/
    case villainActions.DELETE_VILLAIN: {
      const selected = state.data.find(h => h.id === action.payload);
      return {...state, selected, action: villainActions.DELETE_VILLAIN, done: false};
    }
    case villainActions.DELETE_VILLAIN_SUCCESS: {
      const data = state.data.filter(h => h.id !== state.selected.id);
      return {...state, data, selected: null, done: true};
    }
    case villainActions.DELETE_VILLAIN_ERROR:
      return {...state, selected: null, done: false, error: action.payload};
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getVillainState = createFeatureSelector<State>('villains');
export const getAllVillains = createSelector(getVillainState, (state: State) => state.data);
export const getVillain = createSelector(getVillainState, (state: State) => {
  if (state.action === villainActions.GET_VILLAIN && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getVillainState, (state: State) => state.action === villainActions.DELETE_VILLAIN && state.done);

export const getDeleteError = createSelector(getVillainState, (state: State) => {
  return state.action === villainActions.DELETE_VILLAIN ? state.error : null;
});

export const getVillainsError = createSelector(getVillainState, (state: State) => {
  return state.action === villainActions.GET_VILLAINS || state.action === villainActions.GET_VILLAIN ? state.error : null;
});

export const getVillainError = createSelector(getVillainState, (state: State) => {
  return state.action === villainActions.GET_VILLAIN ? state.error : null;
});
