import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JsonFileService } from '../services/json-file.service';

@Injectable()
export class MenuService extends JsonFileService {
    constructor(protected http: Http) { super(http); }

    getFilePath(): string {
        return 'assets/data/menu.json';
    }
}