import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Villain} from '../shared/villain';
import {ApiConfig} from '../../core/models/api-config';
import {CommonUtil} from '../../core/utilities/common.util';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class VillainSearchService {
  constructor(protected http: HttpClient, @Inject('api.config') protected apiConfig: ApiConfig) {
  }

  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('VILLAINS_SERVICE_URL', this.apiConfig);
  }

  search(term: string): Observable<Villain[]> {
    return this.http
      .get<Villain[]>(this.getServiceUrl())
      .map((villains: Villain[]) => {
        const matched = [];
        villains.filter(villain => villain.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
                .forEach(elem => matched.push(elem));
        return matched;
      });
  }
}
