import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'ftc-page-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  title = 'Page not found';
  message = 'Sorry, This page is not available';

  constructor(private loggerService: LoggerService) { }

  ngOnInit() {
    this.loggerService.log('... initializing page not found component from shared module.');
  }
}
