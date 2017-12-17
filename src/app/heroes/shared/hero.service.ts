import { Injectable, Inject } from '@angular/core';

import { Hero } from './hero';
import { ApiConfig } from '../../core/models/api-config';
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HeroService extends BaseService<Hero> {
  constructor(protected http: HttpClient, @Inject('api.config') protected apiConfig: ApiConfig) { super(http); }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('HEROES_SERVICE_URL', this.apiConfig);
  }
}
