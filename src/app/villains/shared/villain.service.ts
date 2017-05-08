import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Villain } from './villain';
import { ApiConfig } from '../../core/models/api-config';
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';

@Injectable()
export class VillainService extends BaseService<Villain> {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig) { super(http); }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('VILLAINS_SERVICE_URL', this.apiConfig);
  }
}
