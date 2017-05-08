import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Hero } from './hero';
import { ApiConfig } from '../../core/models/api-config';
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';

@Injectable()
export class HeroService extends BaseService<Hero> {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig) { super(http); }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('HEROES_SERVICE_URL', this.apiConfig);
  }
}
