import {AlertType} from './alert-type';

export class Alert {
  constructor(public id: string,
              public params = {},
              public msg: string,
              public type: string = AlertType.DANGER,
              public dismissible: boolean = true) {
    const typeDesc = type.toLowerCase();
    if (typeDesc !== AlertType.DANGER &&
      typeDesc !== AlertType.INFO &&
      typeDesc !== AlertType.SUCCESS &&
      typeDesc !== AlertType.WARNING) {
      throw new Error('Invalid alert type. Should be danger, info, success or warning.');
    }
  }
}
