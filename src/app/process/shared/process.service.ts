import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';

import {Process} from './process';
import {ApiConfig} from '../../core/models/api-config';
import {BaseService} from '../../core/services/base.service';
import {CommonUtil} from '../../core/utilities/common.util';

import {DomSanitizer} from '@angular/platform-browser';
import {ProcessFilter} from './process-filter';

@Injectable()
export class ProcessService extends BaseService<Process> {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig, private sanitizer: DomSanitizer) {
    super(http);
  }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('PROCESS_SERVICE_URL', this.apiConfig);
  }

  public getImage(id: string): Observable<Blob> {
    return super.getImage(id, '/image', 'image/jpg').map(blob => {
      const urlCreator = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    });
  }

  public filter(filter: ProcessFilter): Observable<Process[]> {
    return this.http.post(this.getServiceUrl() + '/filter', JSON.stringify(filter)).map(this.extractData);
  }
}
