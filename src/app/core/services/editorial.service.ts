import {Injectable, Inject} from '@angular/core';

// models
import {ApiConfig} from '../models/api-config';
import {Editorial} from '../models/editorial';

// services
import {CachedService} from './cached.service';

// utilities
import {CommonUtil} from '../utilities/common.util';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EditorialService extends CachedService<Editorial> {

  constructor(protected http: HttpClient, @Inject('api.config') protected apiConfig: ApiConfig) {
    super(http, apiConfig);
  }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('EDITORIAL_SERVICE_URL', this.apiConfig);
  }
}
