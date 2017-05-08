import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: Number;
  constructor(private loggerService: LoggerService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.loggerService.log('... initializing footer component from core module.');
  }

}
