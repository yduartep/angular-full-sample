import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ProcessDefinition} from '../../shared/domain/process-definition';
import {ProcessDefinitionElement} from '../../shared/domain/process-definition-element';
import {ApiConfig} from '../../core/models/api-config';
import {BaseService} from '../../core/services/base.service';
import {CommonUtil} from '../../core/utilities/common.util';

import {Observable} from 'rxjs/Observable';

import {DomSanitizer} from '@angular/platform-browser';


@Injectable()
export class ProcessDefinitionService extends BaseService<ProcessDefinition> {

  constructor(protected http: Http, private sanitizer: DomSanitizer, @Inject('api.config') protected apiConfig: ApiConfig) {
    super(http);
  }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('PROCESS_DEFINITION_SERVICE_URL', this.apiConfig);
  }

  public getElements(processDefinitionId: string): Observable<ProcessDefinitionElement[]> {
    return this.http.get(this.getServiceUrl() + '/elements/' + processDefinitionId)
      .map(this.extractData);
  }

  public getImage(id: string): Observable<Blob> {
    return super.getImage(id, '/image', 'image/jpg').map(blob => {
      const urlCreator = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
    });
  }
}
