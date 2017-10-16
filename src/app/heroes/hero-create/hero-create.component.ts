import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

// models
import {Hero} from '../shared/hero';
import {Mode} from '../../core/models/mode.enum';
import {Editorial} from '../../core/models/editorial';
import {Message} from '../../modal-message/message';
import {MessageStatus} from '../../modal-message/message-status';

// services
import {HeroService} from '../shared/hero.service';
import {ValidationService} from '../../core/services/validation.service';
import {AuthHelper} from '../../core/services/auth.helper';
import {EditorialService} from '../../core/services/editorial.service';
import {AlertService} from '../../core/alert/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from '../../modal-message/message.service';

// components
import {UIFormComponent} from '../../ui-elements/ui-form';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent extends UIFormComponent {
  @Input() mode: Mode;
  hero: Hero = new Hero(0, null, null, null);
  selected = -1;
  editorials: Editorial[] = [];

  constructor(private service: HeroService,
              private router: Router,
              private editorialService: EditorialService,
              private alertService: AlertService,
              private messageService: MessageService,
              private authHelper: AuthHelper,
              private translate: TranslateService,
              validation: ValidationService) {
    super(validation);

    this.editorialService.findAll().subscribe(result => {
      this.editorials = [{id: -1, text: 'Select value ...'}].concat(result);
    });
  }

  /**
   * Create a new hero
   */
  onSaveHero() {
    this.authHelper.checkAuthentication();
    this.alertService.clear();

    if (this.validate()) {
      this.hero.editorial = this.editorials.find(e => e.id === this.selected);
      this.service.insert(this.hero).subscribe(res => {
        const key = res.ok ? 'heroes.insertOkMsg' : 'heroes.insertErrMsg';

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
}
