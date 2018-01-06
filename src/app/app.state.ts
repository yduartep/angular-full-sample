import * as fromHeroes from './heroes/store/heroes.reducers';
import * as fromVillains from './villains/store/villains.reducers';

export interface AppState {
  heroes: fromHeroes.State;
  villains: fromVillains.State;
}
