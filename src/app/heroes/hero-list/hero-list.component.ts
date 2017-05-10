import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from '../shared/hero';
import { Editorial } from '../shared/editorial.enum';
import { HeroService } from '../shared/hero.service';
import { SpinnerService } from '../../core/spinner/spinner.service';
import { LoggerService } from '../../core/services/logger.service';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  public isRequesting = false;
  data: Hero[];

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
    const confirmation = window.confirm('Are you sure you want to delete this Hero?');
    if (confirmation) {
      this.service.delete(id).subscribe(res => {
        if (res.ok) {
          const index = this.data.findIndex(hero => hero.id === id);
          this.data.splice(index, 1);
        }
      });
    }
  }
}
