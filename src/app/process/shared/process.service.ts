import {Injectable, Inject} from '@angular/core';
import {Http, RequestOptions, Headers, ResponseContentType} from '@angular/http';

import {Observable} from 'rxjs/Rx';

import {Process} from './process';
import {ApiConfig} from '../../core/models/api-config';
import {BaseService} from '../../core/services/base.service';
import {CommonUtil} from '../../core/utilities/common.util';

import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ProcessService extends BaseService<Process> {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig, private sanitizer: DomSanitizer) {
    super(http);
  }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('PROCESS_SERVICE_URL', this.apiConfig);
  }

  public getImage(id: string): Observable<Blob> {
    const headers = new Headers({'Content-Type': 'image/png'});
    const options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});
    return this.http.get(this.getServiceUrl() + '/image/' + id, options).map(res => {
      return new Blob([res.blob()], {
        type: res.headers.get('Content-Type')
      });
    }).map(blob => {
      const urlCreator = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    });
  }
}
