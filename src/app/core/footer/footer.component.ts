import { Component, OnInit, Inject } from '@angular/core';

import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: Number;
  constructor(@Inject('LoggerService') private loggerService: LoggerService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.loggerService.log('... initializing footer component from core module.');
  }

}
