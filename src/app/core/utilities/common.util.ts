import {ApiConfig} from '../models/api-config';
import {ApiUrl} from '../models/api-url';

export class CommonUtil {
  /**
   * Search the value of an specific cookie
   * @param name the name of the cookie to search
   */
  static getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = name + '=';
    let c: string;
    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].trim();
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  /**
   * Convert from seconds to a valid UTC date in string format
   * @param seconds the total amount of seconds
   */
  static changeExpiredTime(seconds: number): string {
    const now = new Date();
    now.setTime(now.getTime() + (seconds * 1000));
    return now.toUTCString();
  }


  /**
   * Determine if a value is empty or not
   * @param val the value to check
   */
  static isEmpty(val: any): boolean {
    if (val === undefined || val == null) {
      return true;
    }
    if (typeof val === 'string') {
      return val.trim().length <= 0;
    }
    if (typeof val === 'number') {
      return val <= 0;
    }
    return ('' + val).trim().length === 0;
  }

  /**
   * Return the url used to call specific api service
   * @param name the name of the api service
   * @param apiConfig the api settings by environment
   */
  static getApiUrl(name, apiConfig) {
    const result = apiConfig.apiUrls.find(apiUrl => apiUrl.id === name);
    return result ? result.url : null;
  }

  /**
   * Return the api url data related to an specific api service from the url
   * @param url the url from which search the config
   * @param apiConfig the api settings by environment
   * @returns an instance of the ApiUrl found
   */
  static getApiByUrl(url: string, apiConfig: ApiConfig): ApiUrl {
    return apiConfig.apiUrls.find(apiUrl => url.indexOf(apiUrl.url) >= 0);
  }

  static clone(obj) {
    if (!obj) {
      return obj;
    }
    if (this.isArray(obj)) {
      return obj.map(o => JSON.parse(JSON.stringify(o)));
    }
    // return Object.assign({}, obj);
    return JSON.parse(JSON.stringify(obj));
  }

  static isArray(data): boolean {
    return data && data.constructor === Array;
  }


  static sortAlphabetically(a: any, b: any): number {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  /**
   * Open a blob file in a new window
   * @fileName the name of the file to be opened
   * @param blob the content of the file in blob format
   */
  static openFileInWindow(fileName: string, blob: Blob) {
    let base64data = null;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      base64data = reader.result;

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // for IE option
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        // for other browsers
        window.open(base64data, '', '_blank');
      }
    };
  }

  static getUniqId() {
    let c = 1;
    let d: any = new Date();
    const m = d.getMilliseconds() + '';
    const u = ++d + m + (++c === 10000 ? (c = 1) : c);

    return u;
  }

  static isDefined(value: Object, args: string[]): boolean {
    if (!CommonUtil.isEmpty(value) && args[0] in value) {
      const copy = args.slice(1, args.length);
      if (copy.length) {
        return this.isDefined(value[args[0]], copy);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
