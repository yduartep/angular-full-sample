import {Editorial} from '../../core/models/editorial';

export class Hero {
  constructor(public id: number,
              public name: string,
              public editorial: Editorial,
              public image: string) {
  }
}
