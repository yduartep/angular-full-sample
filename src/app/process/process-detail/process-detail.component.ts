import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Process } from '../shared/process';
import { ProcessService } from '../shared/process.service';

import { Message } from '../../modal-message/message';
import { MessageType } from '../../modal-message/message-type';
import { MessageService } from '../../modal-message/message.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {
  processIdSelected: number;
  process: Process;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProcessService,
    private messageService: MessageService
  ) {
    // subscribe to the messages sent from other components
    /*this.subscription = this.messageService.getConfirmed().subscribe((isConfirmed: boolean) => {
      this.onOkDelete(isConfirmed);
    });*/
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.findById(+params['processInstanceId']).subscribe((process: Process) => {
        this.process = process;
      });
    });
  }

  delete(id: number) {
    /*this.processIdSelected = id;
    this.messageService.showMessage(new Message('Are you sure do you want to delete this Process?', 'warning', MessageType.CONFIRM));
    localStorage['action'] = 'DELETE_HERO';
    localStorage['from'] = 'HERO_DETAIL';*/

    const confirmation = window.confirm('Are you sure you want to delete this Super Process?');
    if (confirmation) {
      this.service.delete(id).subscribe(res => {
        if (res.ok) {
          this.router.navigate(['/process']);
        } else {
          alert('Couldn\'t delete 💩');
        }
      });
    }
  }

  /*onOkDelete(value) {
    if (localStorage['action'] === 'DELETE_HERO' && localStorage['from'] === 'HERO_DETAIL') {
      localStorage.removeItem('action');
      localStorage.removeItem('from');

      if (value) {
        this.service.delete(this.processIdSelected).subscribe(res => {
          if (res.ok) {
            this.messageService.showMessage(new Message('The super process was deleted successfully!!', 'success'));
            this.router.navigate(['/process']);
          } else {
            this.messageService.showMessage(new Message('Impossible to delete the super process!'));
          }
        }, err => this.messageService.showMessage(new Message('Impossible to delete the super process!')));
      } else {
        this.processIdSelected = null;
      }
    }
  }*/
}
