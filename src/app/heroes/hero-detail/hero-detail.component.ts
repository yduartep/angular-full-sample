import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from '../shared/hero';
import { Editorial } from '../shared/editorial.enum';
import { HeroService } from '../shared/hero.service';

import { Message } from '../../modal-message/message';
import { MessageType } from '../../modal-message/message-type';
import { MessageService } from '../../modal-message/message.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroIdSelected: number;
  hero: Hero;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService,
    private messageService: MessageService
  ) {
    // subscribe to the messages sent from other components
    /*this.subscription = this.messageService.getConfirmed().subscribe((isConfirmed: boolean) => {
      this.onOkDelete(isConfirmed);
    });*/
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.findById(+params['id']).subscribe((hero: Hero) => {
        hero['editorialText'] = Editorial[hero.editorial];
        this.hero = hero;
      });
    });
  }

  delete(id: number) {
    /*this.heroIdSelected = id;
    this.messageService.showMessage(new Message('Are you sure do you want to delete this Hero?', 'warning', MessageType.CONFIRM));
    localStorage['action'] = 'DELETE_HERO';
    localStorage['from'] = 'HERO_DETAIL';*/

    const confirmation = window.confirm('Are you sure you want to delete this Super Hero?');
    if (confirmation) {
      this.service.delete(id).subscribe(res => {
        if (res.ok) {
          this.router.navigate(['/heroes']);
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
        this.service.delete(this.heroIdSelected).subscribe(res => {
          if (res.ok) {
            this.messageService.showMessage(new Message('The super hero was deleted successfully!!', 'success'));
            this.router.navigate(['/heroes']);
          } else {
            this.messageService.showMessage(new Message('Impossible to delete the super hero!'));
          }
        }, err => this.messageService.showMessage(new Message('Impossible to delete the super hero!')));
      } else {
        this.heroIdSelected = null;
      }
    }
  }*/
}
