import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiConfig } from '../../core/models/api-config';
import { BaseService } from '../../core/services/base.service';
import { CommonUtil } from '../../core/utilities/common.util';
import {ProcessHistory} from './processHistory';

@Injectable()
export class ProcessHistoryService extends BaseService<ProcessHistory> {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig) { super(http); }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('PROCESS_HISTORY_SERVICE_URL', this.apiConfig);
  }

  public findByProcessInstanceId(processInstanceId: any): Observable<ProcessHistory[]> {
    return this.http.get(this.getServiceUrl() + '/' + processInstanceId)
      .map(this.extractData);
  }

}
