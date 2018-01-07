export class Hero {
  constructor(public id: number,
              public name: string,
              public editorial: number,
              public image: string,
              public creationDate: Date = new Date()) {
  }
}
