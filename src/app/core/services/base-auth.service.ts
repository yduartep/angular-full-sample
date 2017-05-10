import { Injectable } from '@angular/core';
import { CommonUtil } from '../utilities/common.util';

export abstract class BaseAuthService {

  constructor(protected cookieUserId: string, protected cookieTokenId: string) { }

  /**
   * Add user id to the cookie
   * @param value the value of the user id
   * @param expiredTime the total seconds after the page should expire
   */
  protected addUserInfo(value: string, expiredTime: number) {
    const expiredTimeString = CommonUtil.changeExpiredTime(expiredTime * 60 * 1000);
    document.cookie = this.cookieUserId + '=' + value + '; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Add token to the cookie
   * @param value the value of the token
   * @param expiredTime the total seconds after the page should expire
   */
  protected addTokenInfo(value: string, expiredTime: number) {
    const expiredTimeString = CommonUtil.changeExpiredTime(expiredTime * 60 * 1000);
    document.cookie = this.cookieTokenId + '=' + value + '; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Remove the user id from the cookie
   */
  protected removeUserInfo() {
    const expiredTimeString = CommonUtil.changeExpiredTime(0);
    document.cookie = this.cookieUserId + '=; expires=' + expiredTimeString + '; path=/';
  }

  /**
   * Remove the token from the cookie
   */
  protected removeTokenInfo() {
    const expiredTimeString = CommonUtil.changeExpiredTime(0);
    document.cookie = this.cookieTokenId + '=; expires=' + expiredTimeString + '; path=/';
  }
}
