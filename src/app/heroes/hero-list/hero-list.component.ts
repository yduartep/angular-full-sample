import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// models
import { Hero } from '../shared/hero';
import { Editorial } from '../shared/editorial.enum';
import { Message } from '../../modal-message/message';
import { MessageType } from '../../modal-message/message-type';

// services
import { HeroService } from '../shared/hero.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { LoggerService } from '../../core/services/logger.service';
import { MessageService } from '../../modal-message/message.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  public isRequesting = false;
  heroIdSelected: number;
  data: Hero[];
  subscription: Subscription;

  constructor(
    @Inject('LoggerService') private loggerService: LoggerService,
    private service: HeroService,
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
    this.loggerService.log('... initializing Hero list component.');
    this.isRequesting = true;

    this.service.findAll()
      .subscribe(heroes => {
        this.data = heroes.map(hero => {
          hero['editorialText'] = Editorial[hero.editorial];
          return hero;
        });
      });
  }

  delete(id: number) {
    this.heroIdSelected = id;
    this.messageService.showMessage(new Message('Are you sure do you want to delete this Hero?', 'warning', MessageType.CONFIRM));
  }

  onOkDelete(value) {
    if (value) {
      this.service.delete(this.heroIdSelected).subscribe(res => {
        if (res.ok) {
          const index = this.data.findIndex(hero => hero.id === this.heroIdSelected);
          this.data.splice(index, 1);
          this.heroIdSelected = null;
          this.messageService.showMessage(new Message('The super hero was deleted successfully!!', 'success'));
        } else {
          this.messageService.showMessage(new Message('Impossible to delete the super hero!'));
        }
      }, err => this.messageService.showMessage(new Message('Impossible to delete the super hero!')));
    } else {
      this.heroIdSelected = null;
    }
  }
}
