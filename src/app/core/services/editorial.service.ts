import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

// models
import {ApiConfig} from '../models/api-config';
import {Editorial} from '../models/editorial';

// services
import {CachedService} from './cached.service';

// utilities
import {CommonUtil} from '../utilities/common.util';

@Injectable()
export class EditorialService extends CachedService<Editorial> {

  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig) {
    super(http, apiConfig);
  }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('EDITORIAL_SERVICE_URL', this.apiConfig);
  }
}
