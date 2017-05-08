import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../services/logger.service';
import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit {
    visible = false;

    private spinnerStateChanged: Subscription;

    constructor(
        private loggerService: LoggerService,
        private spinnerService: SpinnerService
    ) { }

    ngOnInit() {
        this.loggerService.log('... initializing spinner component from core module.');
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe((state: SpinnerState) => {
                this.visible = state.show;
        });
    }

    ngOnDestroy() {
        this.spinnerStateChanged.unsubscribe();
    }
}
