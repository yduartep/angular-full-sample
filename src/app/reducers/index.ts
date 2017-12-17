import {ActionReducerMap} from '@ngrx/store';
import * as heroesReducer from '../heroes/heroes.reducers';

export const reducers: ActionReducerMap<any> = {
  heroes: heroesReducer.reducer
};
