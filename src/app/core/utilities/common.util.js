"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonUtil = (function () {
    function CommonUtil() {
    }
    /**
     * Search the value of an specific cookie
     * @param name the name of the cookie to search
     */
    CommonUtil.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var caLen = ca.length;
        var cookieName = name + '=';
        var c;
        for (var i = 0; i < caLen; i += 1) {
            c = ca[i].trim();
            if (c.indexOf(cookieName) === 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    };
    /**
     * Convert from seconds to a valid UTC date in string format
     * @param seconds the total amount of seconds
     */
    CommonUtil.changeExpiredTime = function (seconds) {
        var now = new Date();
        now.setTime(now.getTime() + (seconds));
        return now.toUTCString();
    };
    /**
     * Determine if a value is empty or not
     * @param val the value to check
     */
    CommonUtil.isEmpty = function (val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    };
    /**
     * Return the url used to call specific api service
     * @param name the name of the api service
     * @param apiConfig the api settings by environment
     */
    CommonUtil.getApiUrl = function (name, apiConfig) {
        var result = apiConfig.apiUrls.find(function (apiUrl) { return apiUrl.id === name; });
        return result ? result.url : null;
    };
    /**
     * Return the api url data related to an specific api service from the url
     * @param url the url from which search the config
     * @param apiConfig the api settings by environment
     * @returns an instance of the ApiUrl found
     */
    CommonUtil.getApiByUrl = function (url, apiConfig) {
        return apiConfig.apiUrls.find(function (apiUrl) { return apiUrl.url === url; });
    };
    return CommonUtil;
}());
exports.CommonUtil = CommonUtil;
