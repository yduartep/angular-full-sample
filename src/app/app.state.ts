import * as fromHeroes from './heroes/heroes.reducers';

export interface AppState {
  heroes: fromHeroes.State;
}
