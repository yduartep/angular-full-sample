import {CommonUtil} from './common.util';
import {Moment} from 'moment';
import * as moment from 'moment';

export class DateUtil {
  /**
   * Global format date of the application
   */
  static FORMAT_DATE = 'MM/dd/yyyy';

  static dataToString(date: Date, format?: string) {
    if (CommonUtil.isEmpty(format)) {
      format = DateUtil.FORMAT_DATE;
    }
    return date ? moment(date).format(format) : '';
  }

  static getDateTimeFromMoment(date: Moment) {
    const now = new Date();
    return new Date(
      date.year(), date.month(), date.date(),
      now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  }

  static getNow() {
    const now = new Date();
    return moment(now, DateUtil.FORMAT_DATE).toDate();
  }

  static isValidDate(date, format): Moment {
    if (CommonUtil.isEmpty(format)) {
      throw  new Error('Enter a valid date format before to validate it');
    }
    if (CommonUtil.isEmpty(date)) {
      throw  new Error('Enter a valid date before to validate it');
    }
    const now = moment();
    if (moment.isMoment(date) && date.isValid()) {
      date.hour(now.hour());
      date.minute(now.minute());
      date.second(now.second());

      return date;
    }
    if (typeof date === 'string' && moment(date.trim(), format, true).isValid()) {
      const finalDate = moment(date.trim(), format, true);
      finalDate.hour(now.hour());
      finalDate.minute(now.minute());
      finalDate.second(now.second());

      return finalDate;
    }
    throw  new Error('The date is not valid');
  }
}
