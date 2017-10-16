import {EditorialType} from './editorial-type.enum';

export class Editorial {
  constructor(public id: EditorialType, public text: string) {
  }
}
