import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { fadeInNewAnimation } from '../../_animations/index';


// models
import { Process } from '../shared/process';
import { Message } from '../../modal-message/message';
import { MessageType } from '../../modal-message/message-type';

// services
import { ProcessService } from '../shared/process.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { LoggerService } from '../../core/services/logger.service';
import { MessageService } from '../../modal-message/message.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css'],
  // make fade in animation available to this component
  animations: [fadeInNewAnimation],

  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInNewAnimation]': '' }
})
export class ProcessListComponent implements OnInit {
  public isRequesting = false;
  processIdSelected: string;
  data: Process[];
  subscription: Subscription;

  constructor(
    @Inject('LoggerService') private loggerService: LoggerService,
    private service: ProcessService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private messageService: MessageService
  ) {
    // subscribe to the messages sent from other components
    this.subscription = this.messageService.getConfirmed().subscribe((isConfirmed: boolean) => {
      this.onOkDelete(isConfirmed);
    });
  }

  ngOnInit() {
    this.loggerService.log('... initializing Process list component.');
    this.isRequesting = true;

    this.service.findAll()
      .subscribe(processes => {
        this.data = processes.map(process => {
          return process;
        });
      });
  }

  delete(id: string) {
    this.processIdSelected = id;
    this.messageService.showMessage(new Message('Are you sure do you want to delete this Process?', 'warning', MessageType.CONFIRM));
  }

  onOkDelete(value) {
    if (value) {
      this.service.delete(this.processIdSelected).subscribe(res => {
        if (res.ok) {
          const index = this.data.findIndex(process => process.processInstanceId === this.processIdSelected);
          this.data.splice(index, 1);
          this.processIdSelected = null;
          this.messageService.showMessage(new Message('The process was deleted successfully!!', 'success'));
        } else {
          this.messageService.showMessage(new Message('Impossible to delete the process!'));
        }
      }, err => this.messageService.showMessage(new Message('Impossible to delete the process!')));
    } else {
      this.processIdSelected = null;
    }
  }
}
