import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {WeekDays} from '../types/week-days.type';
import {UtilsService} from './utils.service';
import {IDay} from '../models/day.model';
import {IMonth} from '../models/month.model';
import {FormControl} from '@angular/forms';
import {IDayCalendarConfig} from '../config/day-calendar-config';
import {IMonthCalendarConfig} from '../config/month-calendar-config';

@Injectable()
export class DayCalendarService {
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  readonly DEFAULT_CONFIG: IDayCalendarConfig = {
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
    showNearMonthDays: true,
    showWeekNumbers: false,
    firstDayOfWeek: 'su',
    format: 'DD-MM-YYYY',
    allowMultiSelect: false,
    monthFormat: 'MMM, YYYY',
    enableMonthSelector: true,
    dayBtnFormat: 'DD'
  };

  constructor(private utilsService: UtilsService) {
  }

  private removeNearMonthWeeks(currentMonth: Moment, monthArray: IDay[][]): IDay[][] {
    if (monthArray[monthArray.length - 1].find((day) => day.date.isSame(currentMonth, 'month'))) {
      return monthArray;
    } else {
      return monthArray.slice(0, -1);
    }
  }

  getConfig(config: IDayCalendarConfig): IDayCalendarConfig {
    return {...this.DEFAULT_CONFIG, ...this.utilsService.clearUndefined(config)};
  }

  generateDaysMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[day] = index;
      return map;
    }, <{[key: number]: string}>{});
  }

  generateMonthArray(config: IDayCalendarConfig, month: Moment, selected: Moment[]): IDay[][] {
    let monthArray: IDay[][] = [];
    const firstDayOfMonth = month.clone().startOf('month');
    const firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
    const firstDayOfBoard = firstDayOfMonth;
    while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
      firstDayOfBoard.subtract(1, 'day');
    }
    const current = firstDayOfBoard.clone();
    const daysOfCalendar: IDay[] = this.utilsService.createArray(42).reduce((array: IDay[]) => {
      const isSelected = !!selected.find(selectedDay => current.isSame(selectedDay, 'day'));
      array.push({
        date: current.clone(),
        selected: isSelected,
        currentMonth: current.isSame(month, 'month'),
        prevMonth: current.isSame(month.clone().subtract(1, 'month'), 'month'),
        nextMonth: current.isSame(month.clone().add(1, 'month'), 'month'),
        currentDay: current.isSame(moment(), 'day')
      });
      current.add(1, 'd');
      return array;
    }, []);

    daysOfCalendar.forEach((day, index) => {
      const weekIndex = Math.floor(index / 7);

      if (!monthArray[weekIndex]) {
        monthArray.push([]);
      }

      monthArray[weekIndex].push(day);
    });

    if (!config.showNearMonthDays) {
      monthArray = this.removeNearMonthWeeks(month, monthArray);
    }

    return monthArray;
  }

  generateWeekdays(firstDayOfWeek: WeekDays, weekdayNames: {[key: string]: string}): string[] {
    const weekdays: string[] = [];
    const daysMap = this.generateDaysMap(firstDayOfWeek);

    for (const dayKey in daysMap) {
      if (daysMap.hasOwnProperty(dayKey)) {
        weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
      }
    }

    return weekdays;
  }

  generateYear(year: Moment, selected: Moment[] = null): IMonth[] {
    const index = year.clone().startOf('year');
    return this.utilsService.createArray(12).map(() => {
      const month = {
        date: index.clone(),
        selected: !!selected.find(s => index.isSame(s, 'month')),
        currentMonth: index.isSame(moment(), 'month')
      };

      index.add(1, 'month');
      return month;
    });
  }

  isDateDisabled(day: IDay, config: IDayCalendarConfig): boolean {
    if (config.isDayDisabledCallback) {
      return config.isDayDisabledCallback(day.date);
    }

    if (config.min && day.date.isBefore(config.min, 'day')) {
      return true;
    }

    return !!(config.max && day.date.isAfter(config.max, 'day'));
  }

  // todo:: add unit tests
  getHeaderLabel(config: IDayCalendarConfig, month: Moment): string {
    if (config.monthFormatter) {
      return config.monthFormatter(month);
    }

    return month.format(config.monthFormat);
  }

  // todo:: add unit tests
  shouldShowLeft(min: Moment, currentMonthView: Moment): boolean {
    return min ? min.isBefore(currentMonthView, 'month') : true;
  }

  // todo:: add unit tests
  shouldShowRight(max: Moment, currentMonthView: Moment): boolean {
    return max ? max.isAfter(currentMonthView, 'month') : true;
  }

  generateDaysIndexMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[index] = day;
      return map;
    }, <{[key: number]: string}>{});
  }

  // todo:: add unit tests
  getMonthCalendarConfig(componentConfig: IDayCalendarConfig): IMonthCalendarConfig {
    return this.utilsService.clearUndefined({
      min: componentConfig.min,
      max: componentConfig.max,
      format: componentConfig.format,
      isNavHeaderBtnClickable: true,
      allowMultiSelect: false,
      yearFormat: componentConfig.yearFormat,
      yearFormatter: componentConfig.yearFormatter,
      monthBtnFormat: componentConfig.monthBtnFormat,
      monthBtnFormatter: componentConfig.monthBtnFormatter,
    });
  }

  getDayBtnText(config: IDayCalendarConfig, day: Moment): string {
    if (config.dayBtnFormatter) {
      return config.dayBtnFormatter(day);
    }

    return day.format(config.dayBtnFormat);
  }

  getMonthBtnText(config: IMonthCalendarConfig, month: Moment): string {
    if (config.monthBtnFormatter) {
      return config.monthBtnFormatter(month);
    }

    return month.format(config.monthBtnFormat);
  }
}
