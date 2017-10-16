import {TDrops, TOpens} from '../types/poistions.type';
import {IDayCalendarConfig} from './day-calendar-config';
import {IMonthCalendarConfig} from './month-calendar-config';

export interface IDatePickerConfig extends IDayCalendarConfig, IMonthCalendarConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  appendTo?: string|HTMLElement;
  inputElementContainer?: HTMLElement;
  showGoToCurrent?: boolean;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}
