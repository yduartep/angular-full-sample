import {Http} from '@angular/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';

// services
import {BaseService} from './base.service';

// models
import {ApiConfig} from '../models/api-config';


export abstract class CachedService<T> extends BaseService<T> {
  protected dataSubject = new ReplaySubject<T[]>(1);
  protected data: Observable<T[]> = this.dataSubject.asObservable();

  constructor(protected http: Http, protected apiConfig: ApiConfig) {
    super(http);

    this.fetch();
  }

  /**
   * Fetch the data from the DB
   */
  fetch() {
    return this.http.get(this.getServiceUrl()).map(this.extractData).subscribe(response => {
      this.dataSubject.next(response);
    });
  }

  /**
   * Find an object by specific field using cached data
   * @param fieldId the name of the field identifier
   * @param fieldValue the value of the field identifier
   * @returns gets the object found
   */
  findByField(fieldId: string, fieldValue: any): Observable<T> {
    return this.data.map((values: T[]) => values.find(elem => elem[fieldId] === fieldValue));
  }

  /**
   * Find all the elements cached in the last fetch if no parameters passed
   * @returns gets the list of objects found
   */
  findAll(params?): Observable<T[]> {
    // not cached results if the call have params
    if (params) {
      return super.findAll(params);
    }
    return this.data;
  }
}
