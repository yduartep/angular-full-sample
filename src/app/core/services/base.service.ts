import {Http, Response} from '@angular/http';
import {CommonUtil} from '../utilities/common.util';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export abstract class BaseService<T> {

  constructor(protected http: Http) {
  }

  /**
   * Load the base service url by configuration
   */
  public abstract getServiceUrl(): string;

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<T> {
    return this.http.get(this.getServiceUrl() + '/' + id)
      .map(this.extractData);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<T[]> {
    return this.http.get(this.getServiceUrl(), {search: params})
      .map(this.extractData);
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<Response> {
    return this.http.delete(this.getServiceUrl() + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: T): Observable<Response> {
    return this.http.post(this.getServiceUrl(), JSON.stringify(data));
  }

  /**
   * Updadte specific object into DB
   * @param fieldId the name of the field that identify the object
   * @param data the object to be updated
   * @returns gets the response
   */
  public update(fieldId: string, data: T): Observable<Response> {
    return this.http.put(this.getServiceUrl() + '/' + data[fieldId], JSON.stringify(data));
  }

  /**
   * Extract data that arrives from the response
   * @param res the response
   */
  protected extractData(res: Response) {
    if (!CommonUtil.isEmpty(res['_body'])) {
      return res.json() || {};
    }
    return null;
  }
}
