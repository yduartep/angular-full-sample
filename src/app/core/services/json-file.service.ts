import { Http, Response } from '@angular/http';

export abstract class JsonFileService {

    constructor(protected http: Http) { }

    /**
     * Load the path of the json file
     */
    abstract getFilePath(): string;

    /**
     * Load the data defined in the json file
     */
    getData() {
        return this.http.get(this.getFilePath()).map(this.extractData);
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
