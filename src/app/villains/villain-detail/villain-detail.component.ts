import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';

// models
import {Villain} from '../shared/villain';
import {MessageStatus} from '../../modal-message/message-status';
import {Message} from '../../modal-message/message';
import {ModalMessageSettings} from '../../modal-message/modal-message-settings';
import {MessageType} from '../../modal-message/message-type';

// services
import {VillainService} from '../shared/villain.service';
import {AuthHelper} from '../../core/services/auth.helper';
import {AlertService} from '../../core/alert/alert.service';
import {MessageService} from '../../modal-message/message.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {
  villain: Observable<Villain>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: VillainService,
              private authHelper: AuthHelper,
              private alertService: AlertService,
              private messageService: MessageService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.villain = this.service.findById(+params['id']);
    });
  }

  /**
   * Delete the selected villain
   * @param {number} id the villain id
   */
  delete(id: number) {
    this.authHelper.checkAuthentication();
    this.alertService.clear();

    this.translate.get('villains.confirmDeleteMsg').subscribe(text => {
      // create settings
      const settings = new ModalMessageSettings();
      settings.onConfirmCallback = this.onOkDelete.bind(this, id);

      // display the modal calling the service
      this.messageService.showMessage(new Message(text, MessageStatus.WARNING, MessageType.CONFIRM, settings));
    });
  }

  /**
   * What to do if confirm to delete the villain
   * @param id the villain identifier
   */
  onOkDelete(id) {
    this.service.delete(id).subscribe(res => {
      const key = res ? 'villains.deleteOkMsg' : 'villains.deleteErrMsg';
      this.translate.get(key).subscribe(text => {
        if (res) {
          this.messageService.showMessage(new Message(text, MessageStatus.SUCCESS));
          this.router.navigate(['/villains']);
        } else {
          this.alertService.error(key, {}, text);
        }
      });
    });
  }
}
