import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  forwardRef,
  Renderer2,
  HostListener,
  Input,
  ViewChild,
  SimpleChanges, Optional, Inject
} from '@angular/core';
import {
  NG_ASYNC_VALIDATORS, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

// services
import {DomHelper} from './common/services/dom-appender.service';
import {UtilsService} from './common/services/utils.service';
import {DatePickerService} from './common/services/date-picker.service';
import {ValidationService} from '../../core/services/validation.service';

// config
import {IDayCalendarConfig} from './common/config/day-calendar-config';
import {IDatePickerConfig} from './common/config/date-picker-config';
import {IDpDayPickerApi} from './ui-datepicker.api';

// model
import {IDate} from './common/models/date.model';
import { IDay } from './common/models/day.model';
import {SingleCalendarValue} from './common/types/single-calendar-value';

// components
import {UIElementBase} from '../ui-element-base';
import {UIDayCalendarComponent} from './day-calendar/day-calendar.component';

// utils
import {Moment, unitOfTime} from 'moment';
import * as moment from 'moment';
import {CommonUtil} from '../../core/utilities/common.util';
import {DateUtil} from '../../core/utilities/date.util';

interface EDay {
  day: IDay;
  closeCalendar: boolean;
}

@Component({
  selector: 'ui-datepicker',
  templateUrl: 'ui-datepicker.component.html',
  styleUrls: ['ui-datepicker.component.css'],
  providers: [
    DatePickerService,
    DomHelper,
    UtilsService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UIDatePickerComponent),
      multi: true
    }
  ]
})
export class UIDatePickerComponent extends UIElementBase<Moment> implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    format: 'DD/MM/YYYY',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: false,
    closeOnSelectDelay: 100,
    onOpenDelay: 100,
    weekdayNames: {
      su: 'Su',
      mo: 'Mo',
      tu: 'Tu',
      we: 'We',
      th: 'Th',
      fr: 'Fr',
      sa: 'Sa'
    },
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM'
  };
  @Input() identifier: string = CommonUtil.getUniqId();
  @Input() displayDate: SingleCalendarValue;

  @ViewChild('dpInputContainer') inputContainer: ElementRef;
  @ViewChild('dpCalendarContainer') calendarContainer: ElementRef;
  @ViewChild('dpPopup') popup: ElementRef;
  @ViewChild('dpCalendar') dayCalendarRef: UIDayCalendarComponent;

  isInited = false;
  componentConfig: IDatePickerConfig;
  dayCalendarConfig: IDayCalendarConfig;
  _areCalendarsShown = false;
  hideStateHelper = false;
  currentDateView: Moment;
  calendarWrapper: HTMLElement;
  appendToElement: HTMLElement;
  inputElementContainer: HTMLElement;
  popupElem: HTMLElement;
  innerElementClickListeners: Function[] = [];
  globalListeners: Function[] = [];
  api: IDpDayPickerApi = {
    open: this.showCalendars.bind(this),
    close: this.hideCalendar.bind(this)
  };

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              validationService: ValidationService,
              private datePickerService: DatePickerService,
              private domHelper: DomHelper,
              private elemRef: ElementRef,
              private renderer: Renderer2,
              private utilsService: UtilsService) {
    super(validators, asyncValidators, validationService);
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isInited) {
      this.init();
    }
  }

  ngAfterViewInit() {
    this.setElementPositionInDom();
  }

  ngOnDestroy() {
    this.innerElementClickListeners.forEach(ul => ul());
    this.appendToElement.removeChild(this.calendarWrapper);
  }

  get textValue(): string {
    if (this.value) {
      return this.datePickerService.dateToString(this.value.toDate(), this.config.format);
    }
    return '';
  }

  get areCalendarsShown(): boolean {
    return this._areCalendarsShown;
  }

  set areCalendarsShown(value: boolean) {
    if (value) {
      this.startGlobalListeners();
      this.domHelper.appendElementToPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElementContainer,
        dimElem: this.popupElem,
        drops: this.componentConfig.drops,
        opens: this.componentConfig.opens
      });
    } else {
      this.stopGlobalListeners();
      this.datePickerService.pickerClosed();
    }

    this._areCalendarsShown = value;
  }

  @HostListener('document:click')
  onBodyClick() {
    if (!this.hideStateHelper) {
      this.hideCalendar();
    }
    this.hideStateHelper = false;
  }

  @HostListener('document:scroll')
  @HostListener('window:resize')
  onScroll() {
    if (this.areCalendarsShown) {
      this.domHelper.setElementPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElementContainer,
        dimElem: this.popupElem,
        drops: this.componentConfig.drops,
        opens: this.componentConfig.opens
      });
    }
  }

  init() {
    this.componentConfig = this.datePickerService.getConfig(this.config);
    this.dayCalendarConfig = this.datePickerService.getDayConfigService(this.componentConfig);
    this.initCurrentDateView();
  }

  toogleCalendar() {
    if (this.areCalendarsShown) {
      this.hideCalendar();
    } else {
      this.showCalendars();
    }
  }

  showCalendars() {
    this.hideStateHelper = true;
    this.areCalendarsShown = true;
  }

  hideCalendar() {
    this.areCalendarsShown = false;
  }

  moveToCurrent() {
    this.currentDateView = moment();
    this.value = this.currentDateView;
  }

  onDateSelected(date: EDay, granularity: unitOfTime.Base) {
    // format the date selected creating a new instance
    this.value = this.utilsService.convertToMoment(date.day.date, this.componentConfig.format);
    this.onDateClick(date.closeCalendar);
  }

  onDateChanged(date) {
    let value = moment(date, this.componentConfig.format, true);
    if (!value.isValid()) {
      value = null;
    }
    this.value = value;
  }

  onDateClick(close: boolean = true) {
    if (this.componentConfig.closeOnSelect && close) {
      setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    switch (event.keyCode) {
      case (9):
      case (27):
        this.hideCalendar();
        break;
    }
  }

  private initCurrentDateView() {
    if (this.value) {
      if (moment.isMoment(this.value) && this.value.isValid()) {
        this.currentDateView = this.value;
      } else {
        this.currentDateView = this.utilsService.convertToMoment(this.value, this.componentConfig.format) || moment();
      }
    } else {
      this.currentDateView = this.utilsService.convertToMoment(moment(), this.componentConfig.format);
    }
    // this.currentDateView = this.displayDate
    //   ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
    //   : this.utilsService.getDefaultDisplayDate(null, [ this.value ], this.componentConfig.allowMultiSelect);
  }

  private setElementPositionInDom() {
    this.calendarWrapper = this.calendarContainer.nativeElement;
    this.setInputElementContainer();
    this.popupElem = this.popup.nativeElement;
    this.handleInnerElementClick(this.popupElem);

    const {appendTo} = this.componentConfig;

    if (appendTo) {
      if (typeof appendTo === 'string') {
        this.appendToElement = <HTMLElement>document.querySelector(<string>appendTo);
      } else {
        this.appendToElement = <HTMLElement>appendTo;
      }
    } else {
      this.appendToElement = this.elemRef.nativeElement;
    }
    this.appendToElement.appendChild(this.calendarWrapper);
  }

  private setInputElementContainer() {
    this.inputElementContainer = this.componentConfig.inputElementContainer || this.inputContainer.nativeElement;
  }

  private handleInnerElementClick(element: HTMLElement) {
    this.innerElementClickListeners.push(
      this.renderer.listen(element, 'click', () => {
        this.hideStateHelper = true;
      })
    );
  }

  private startGlobalListeners() {
    this.globalListeners.push(
      this.renderer.listen('document', 'keydown', (e: KeyboardEvent) => {
        this.onKeyPress(e);
      }));
  }

  private stopGlobalListeners() {
    this.globalListeners.forEach((ul) => ul());
    this.globalListeners = [];
  }
}
