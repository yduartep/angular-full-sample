import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from '../shared/hero';
import { Editorial } from '../shared/editorial.enum';
import { HeroService } from '../shared/hero.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { LoggerService } from '../../core/services/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalAlertComponent } from '../../shared/modal-alert/modal-alert.component';
import { ModalStatus } from '../../shared/modal-alert/modal-status.enum';

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
  @ViewChild("confirmDelete") confirmDelete: ModalAlertComponent;
  @ViewChild("alertResult") alertResult: ModalAlertComponent;

  constructor(
    private loggerService: LoggerService,
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loggerService.log('... initializing Hero list component.');
    this.spinnerService.show();
    this.isRequesting = true;

    this.service.findAll()
      .subscribe(heroes => {
        this.data = heroes.map(hero => {
          hero['editorialText'] = Editorial[hero.editorial];
          return hero;
        });

        this.spinnerService.hide();
      });
  }

  delete(id: number) {
    this.heroIdSelected = id;
    this.confirmDelete.show();
  }

  showError(message){
    this.alertResult.message = message;
    this.alertResult.status = ModalStatus.DANGER;
    this.alertResult.show();
  }

  showSuccess(message){
    this.alertResult.message = message;
    this.alertResult.status = ModalStatus.SUCCESS;
    this.alertResult.show();
  }

  onOkDelete(value) {
    if (value) {
      this.service.delete(this.heroIdSelected).subscribe(res => {
        if (res.ok) {
          const index = this.data.findIndex(hero => hero.id === this.heroIdSelected);
          this.data.splice(index, 1);
          this.heroIdSelected = null;          
          this.showSuccess('The super hero was deleted successfully!!');
        } else{
          this.showError('Impossible to delete the super hero!!');
        }
      }, err => this.showError('Impossible to delete the super hero!!'));
    } else {
      this.heroIdSelected = null;
    }
  }

  onOkConfirm(isOk) {
    console.log('I have clicked on ok buton. Value: ' + isOk);
  }

  onCloseConfirm() {
    console.log('I have just closed the modal');
  }
}
