export class ApiUrl {
  constructor(public id: string,
              public url: string,
              public requireAuthBefore: boolean = true) {
  }
}
