import {Component, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoComponent {
  @ViewChild('infoModal') modal: ModalDirective;
  application = environment.appName;
  buildVersion: string;
  buildTimestamp: string;
  buildEnvironment: string;

  constructor() {
    this.buildVersion = environment.buildVersion;
    this.buildTimestamp = environment.buildTimestamp;
    if (environment.envName !== 'prod') {
      this.buildEnvironment = environment.envName;
    }
  }

  /**
   * Display the modal info
   */
  show() {
    this.modal.show();
  }
}
