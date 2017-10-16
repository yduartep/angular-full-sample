import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';


@Injectable()
export class JsonFileService {
  constructor(protected http: Http) {
  }

  /**
   * Load the data defined in the json file
   */
  getData(path: string) {
    return this.http.get(path).map(this.extractData);
  }

  /**
   * Extract data that arrives from the response
   * @param res the response
   */
  private extractData(res: Response) {
    const body = res.json() || {};
    return body.data || body;
  }
}
