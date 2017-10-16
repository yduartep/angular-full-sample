import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

// models
import {Hero} from '../shared/hero';
import {ModalMessageSettings} from '../../modal-message/modal-message-settings';
import {Message} from '../../modal-message/message';
import {MessageStatus} from '../../modal-message/message-status';
import {MessageType} from '../../modal-message/message-type';

// services
import {AuthHelper} from '../../core/services/auth.helper';
import {HeroService} from '../shared/hero.service';
import {AlertService} from '../../core/alert/alert.service';
import {MessageService} from '../../modal-message/message.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Observable<Hero>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HeroService,
              private authHelper: AuthHelper,
              private alertService: AlertService,
              private messageService: MessageService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hero = this.service.findById(+params['id']);
    });
  }

  /**
   * Delete the selected hero
   * @param {number} id the hero id
   */
  delete(id: number) {
    this.authHelper.checkAuthentication();
    this.alertService.clear();

    this.translate.get('heroes.confirmDeleteMsg').subscribe(text => {
      // create settings
      const settings = new ModalMessageSettings();
      settings.onConfirmCallback = this.onOkDelete.bind(this, id);

      // display the modal calling the service
      this.messageService.showMessage(new Message(text, MessageStatus.WARNING, MessageType.CONFIRM, settings));
    });
  }

  /**
   * What to do if confirm to delete the hero
   * @param id the hero identifier
   */
  onOkDelete(id) {
    this.service.delete(id).subscribe(res => {
      const key = res.ok ? 'heroes.deleteOkMsg' : 'heroes.deleteErrMsg';
      this.translate.get(key).subscribe(text => {
        if (res.ok) {
          this.messageService.showMessage(new Message(text, MessageStatus.SUCCESS));
          this.router.navigate(['/heroes']);
        } else {
          this.alertService.error(key, {}, text);
        }
      });
    });
  }
}
