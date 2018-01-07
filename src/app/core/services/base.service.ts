import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export abstract class BaseService<T> {

  constructor(protected http: HttpClient) {
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
    return this.http.get<T>(this.getServiceUrl() + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<T[]> {
    return this.http.get<T[]>(this.getServiceUrl(), {params: params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public delete(id): Observable<T> {
    return this.http.delete<T>(this.getServiceUrl() + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public insert(data: T): Observable<T> {
    return this.http.post<T>(this.getServiceUrl(), JSON.stringify(data), {headers: this.getHttpHeaders()});
  }

  /**
   * Updadte specific object into DB
   * @param fieldId the name of the field that identify the object
   * @param data the object to be updated
   * @returns gets the response
   */
  public update(fieldId: string, data: T): Observable<T> {
    const url = this.getServiceUrl() + '/' + data[fieldId];
    return this.http.put<T>(url, JSON.stringify(data), {headers: this.getHttpHeaders()});
  }

  /**
   * Get the common HttpHeaders
   */
  private getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return headers;
  }
}
