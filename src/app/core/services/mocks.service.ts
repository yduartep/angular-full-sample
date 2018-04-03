import {Injectable} from '@angular/core';
import {JsonFileService} from '../../core/services/json-file.service';

@Injectable()
export class MocksService {
  private mockData;

  constructor(private jsonService: JsonFileService) {
    this.mockData = [];
    this.jsonService.getData('assets/mocks/services.json').subscribe(data => {
      this.mockData = data;
    });
  }

  getData(request: string) {
    return this.mockData[request];
  }
}
