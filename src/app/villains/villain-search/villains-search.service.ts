import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Villain } from '../shared/villain';
import { ApiConfig } from '../../core/models/api-config';
import { CommonUtil } from '../../core/utilities/common.util';

@Injectable()
export class VillainSearchService {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig) { }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('VILLAINS_SERVICE_URL', this.apiConfig);
  }

  search(term: string): Observable<Villain[]> {
    return this.http
      .get(this.getServiceUrl())
      .map((res: Response) => {
        const matched = [];
        const villains = res.json().data || res.json();
        villains.filter(villain => villain.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
                .forEach(elem => matched.push(elem));
        return matched;
      });
  }
}
