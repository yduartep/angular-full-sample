import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  forwardRef,
  HostBinding, Optional, Inject
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../common/services/utils.service';
import { DayCalendarService } from '../common/services/day-calendar.service';
import { IDayCalendarConfig } from '../common/config/day-calendar-config';
import { IMonthCalendarConfig } from '../common/config/month-calendar-config';
import { ECalendarValue } from '../common/types/calendar-value-enum';
import { ECalendarType } from '../common/types/calendar-type-enum';
import { SingleCalendarValue } from '../common/types/single-calendar-value';
import { CalendarValue } from '../common/types/calendar-value';
import { IDay } from '../common/models/day.model';
import { IMonth } from '../common/models/month.model';

import { Moment } from 'moment';
import * as moment from 'moment';
import { CommonUtil } from '../../../core/utilities/common.util';
import { UIElementBase } from '../../ui-element-base';
import { ValidationService } from '../../../core/services/validation.service';

@Component({
  selector: 'dp-day-calendar',
  templateUrl: 'day-calendar.component.html',
  styleUrls: ['day-calendar.component.css'],
  providers: [
    DayCalendarService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UIDayCalendarComponent),
      multi: true
    }
  ]
})
export class UIDayCalendarComponent extends UIElementBase<Moment> implements OnInit, OnChanges {
  @Input() config: IDayCalendarConfig;
  @Input() displayDate: SingleCalendarValue;
  @Output() onSelect: EventEmitter<Object> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  @Output() onToday: EventEmitter<any> = new EventEmitter();

  isInited = false;
  currentDateView: Moment;
  selectedMonth: number;
  selectedYear: number;
  weekdays: string[];
  weeks: IDay[][];
  months: IMonth[];
  inputValueType: ECalendarValue;
  componentConfig: IDayCalendarConfig;
  monthCalendarConfig: IMonthCalendarConfig;

  api = {
    moveCalendarsBy: this.moveCalendarsBy.bind(this)
  };

  constructor( @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    validationService: ValidationService,
    private dayCalendarService: DayCalendarService,
    private utilsService: UtilsService) {
    super(validators, asyncValidators, validationService);
  }

  ngOnInit () {
    this.isInited = true;
    this.init();
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this.isInited) {
      this.init();
    }
  }

  init () {
    this.componentConfig = this.dayCalendarService.getConfig(this.config);
    this.initCurrentDateView();

    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ this.value ]);
    this.weekdays = this.dayCalendarService.generateWeekdays(this.componentConfig.firstDayOfWeek, this.componentConfig.weekdayNames);
    this.months = this.dayCalendarService.generateYear(this.currentDateView, [ this.value ]);
    this.inputValueType = this.utilsService.getInputType(this.value, this.componentConfig.allowMultiSelect);
    this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
    // initialize the month combo
    this.selectedMonth = this.currentDateView.month();
    // initialize the year combo
    this.selectedYear = this.currentDateView.year();
  }

  private initCurrentDateView () {
    if (this.value) {
      if (moment.isMoment(this.value) && this.value.isValid()) {
        this.currentDateView = this.value;
      } else {
        this.currentDateView = this.utilsService.convertToMoment(this.value, this.componentConfig.format) || moment();
      }
    } else if (this.displayDate) {
      this.currentDateView = this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format);
    } else {
      this.currentDateView = this.utilsService.convertToMoment(moment(), this.componentConfig.format);
    }
  }

  writeValue (value: Moment): void {
    const finalValue = this.utilsService.convertToMoment(value, this.componentConfig.format);
    super.writeValue(finalValue);

    if (finalValue) {
      this.init();
      this.processOnChangeCallback(finalValue);
      this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ finalValue ]);
      this.inputValueType = this.utilsService.getInputType(finalValue, this.componentConfig.allowMultiSelect);
    }
  }

  processOnChangeCallback (value: Moment): CalendarValue {
    return this.utilsService.convertFromMomentArray(this.componentConfig.format, [ value ], this.inputValueType);
  }

  updateNavigation () {
    this.selectedMonth = this.currentDateView.month();
    this.selectedYear = this.currentDateView.year();
  }

  isDisabledDay (day: IDay) {
    return this.dayCalendarService.isDateDisabled(day, this.componentConfig);
  }

  dayClicked (day: IDay, closeCalendar: boolean = true) {
    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ this.value ]);
    this.onSelect.emit({ 'day': day, 'closeCalendar': closeCalendar });
  }

  getDayBtnText (day: IDay): string {
    return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
  }

  getMonthBtnText (month: IMonth): string {
    return this.dayCalendarService.getMonthBtnText(this.componentConfig, month.date);
  }

  shouldShowLeftNav (): boolean {
    return this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
  }

  shouldShowRightNav (): boolean {
    return this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
  }

  onLeftNav () {
    this.currentDateView.subtract(1, 'month');
    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ this.value ]);
    this.updateNavigation();
    this.updateSelected();
  }

  onRightNav () {
    this.currentDateView.add(1, 'month');
    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ this.value ]);
    this.updateNavigation();
    this.updateSelected();
  }

  getMonthValue (month) {
    return month.date.month();
  }

  monthSelected () {
    this.currentDateView.month(this.selectedMonth);
    if (this.value) {
      this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ this.value ]);
    } else {
      this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, []);
    }
    this.updateSelected();
  }

  yearSelected () {
    this.currentDateView.year(this.selectedYear);
    if (this.value) {
      this.weeks =
        this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, [ this.value ]);
    } else {
      this.weeks =
        this.dayCalendarService.generateMonthArray(this.componentConfig, this.currentDateView, []);
    }
    this.updateSelected();
  }

  moveCalendarsBy (current: Moment, amount: number, granularity: moment.unitOfTime.Base = 'month') {
    const to = current.add(amount, granularity);
    this.currentDateView = to;
    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, to, [ this.value ]);
    this.updateNavigation();
  }

  private updateSelected() {
    const day = this.weeks.map(array => array.find(d => d.selected)).find(d => d !== undefined);
    if (day) {
      this.dayClicked(day, false);
    }
  }

  hide () {
    this.onHide.emit();
  }

  setToday () {
    this.onToday.emit();
    const day = this.weeks.map(array => array.find(d => d.currentDay)).find(d => d !== undefined);
    if (day) {
      this.dayClicked(day);
    }
  }
}
