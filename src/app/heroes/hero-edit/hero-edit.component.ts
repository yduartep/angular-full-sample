import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent extends UIFormComponent implements OnInit {
  @Input() mode: Mode = Mode.EDIT;
  hero: Hero;
  selected = -1;
  editorials: Editorial[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HeroService,
              private editorialService: EditorialService,
              private alertService: AlertService,
              private messageService: MessageService,
              private authHelper: AuthHelper,
              private translate: TranslateService,
              validation: ValidationService) {
    super(validation);
  }

  ngOnInit() {
    this.editorialService.findAll().subscribe(result => {
      this.editorials = [{id: -1, text: 'Select value ...'}].concat(result);
    });

    this.route.params.subscribe(params => {
      this.service.findById(+params['id']).subscribe(response => {
        this.hero = response;
        this.selected = this.hero.editorial.id;
      });
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
      this.service.update('id', this.hero).subscribe(res => {
        const key = res.ok ? 'heroes.editOkMsg' : 'heroes.editErrMsg';
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

  onEditorialChange(value){
    alert("editorial is " + value);
  }
  /**
   * Display form in view mode
   */
  onReview() {
    this.mode = Mode.VIEW;
  }

  /**
   * If user is in view mode, back to edit mode else go to heroes page
   */
  onBack() {
    if (this.mode === Mode.VIEW) {
      this.mode = Mode.EDIT;
    } else {
      this.router.navigate(['/heroes']);
    }
  }

  /**
   * Reset all fields in the form
   */
  reset() {
    this.hero.image = '';
    this.selected = -1;
    this.hero.name = '';
  }
}
