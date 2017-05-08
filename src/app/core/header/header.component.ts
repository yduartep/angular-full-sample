import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'ftc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loggerService: LoggerService) { }

  ngOnInit() {
    this.loggerService.log('... initializing header component from core module.');
  }

}
