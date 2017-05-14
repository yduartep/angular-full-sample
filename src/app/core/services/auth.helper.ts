import { Injectable, Inject } from '@angular/core';
import { ApiConfig } from '../models/api-config';
import { CommonUtil } from '../utilities/common.util';
import { AuthTypes } from '../factories/auth.type';
import { COOKIE_IDENTIFIERS } from '../../cookie.identifiers';
import { environment } from '../../../environments/environment';

export class AuthHelper {
    /**
    * Determine if there is a user correctly logued in the app
    */
    static isUserLogged(): boolean {
        if (environment.apiConfig.authService === AuthTypes.SKYP) {
            return true;
        }
        const userId = this.getUserLogged();
        const token = this.getToken();
        return (!CommonUtil.isEmpty(userId) && !CommonUtil.isEmpty(token));
    }

    /**
     * Returns the name of the user logged in the app
     */
    static getUserLogged(): string {
        console.log('...... authService = ' + environment.apiConfig.authService);
        if (environment.apiConfig.authService === AuthTypes.SKYP) {
            return null;
        }
        return CommonUtil.getCookie(COOKIE_IDENTIFIERS.USER_ID);
    }

    /**
     * Returns the token stored after login
     */
    static getToken(): string {
        if (environment.apiConfig.authService === AuthTypes.SKYP) {
            return null;
        }
        return CommonUtil.getCookie(COOKIE_IDENTIFIERS.TOKEN_ID);
    }

    /**
   * Add user id to the cookie
   * @param value the value of the user id
   * @param expiredTime the total seconds after the page should expire
   */
    static addUserInfo(value: string, expiredTime: number) {
        const expiredTimeString = CommonUtil.changeExpiredTime(expiredTime * 60 * 1000);
        document.cookie = COOKIE_IDENTIFIERS.USER_ID + '=' + value + '; expires=' + expiredTimeString + '; path=/';
    }

    /**
     * Add token to the cookie
     * @param value the value of the token
     * @param expiredTime the total seconds after the page should expire
     */
    static addTokenInfo(value: string, expiredTime: number) {
        const expiredTimeString = CommonUtil.changeExpiredTime(expiredTime * 60 * 1000);
        document.cookie = COOKIE_IDENTIFIERS.TOKEN_ID + '=' + value + '; expires=' + expiredTimeString + '; path=/';
    }

    /**
     * Remove the user id from the cookie
     */
    static removeUserInfo() {
        const expiredTimeString = CommonUtil.changeExpiredTime(0);
        document.cookie = COOKIE_IDENTIFIERS.USER_ID + '=; expires=' + expiredTimeString + '; path=/';
    }

    /**
     * Remove the token from the cookie
     */
    static removeTokenInfo() {
        const expiredTimeString = CommonUtil.changeExpiredTime(0);
        document.cookie = COOKIE_IDENTIFIERS.TOKEN_ID + '=; expires=' + expiredTimeString + '; path=/';
    }
}
