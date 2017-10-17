import { Component, OnInit, Inject } from '@angular/core';

import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {
  title = 'Page not found';
  message = 'Sorry, This page is not available';

  constructor(@Inject('LoggerService') private loggerService: LoggerService) { }

  ngOnInit() {
    this.loggerService.log('... initializing page not found component from shared module.');
  }
}
